import { beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useRuntimeStore } from "@/stores/runtime";
import type { PythonOutputEvent, PythonStateEvent } from "@/types/runtime";

const runtimeMock = vi.hoisted(() => {
  let outputHandler: ((payload: PythonOutputEvent) => void) | null = null;
  let stateHandler: ((payload: PythonStateEvent) => void) | null = null;

  return {
    detectPython: vi.fn(),
    startRun: vi.fn(),
    sendInput: vi.fn(),
    stopRun: vi.fn(),
    onOutput: vi.fn(async (callback: (payload: PythonOutputEvent) => void) => {
      outputHandler = callback;
      return () => undefined;
    }),
    onState: vi.fn(async (callback: (payload: PythonStateEvent) => void) => {
      stateHandler = callback;
      return () => undefined;
    }),
    emitOutput(payload: PythonOutputEvent) {
      outputHandler?.(payload);
    },
    emitState(payload: PythonStateEvent) {
      stateHandler?.(payload);
    },
    reset() {
      outputHandler = null;
      stateHandler = null;
    },
  };
});

vi.mock("@/services/runtime/pythonRuntime", () => ({
  pythonRuntime: runtimeMock,
}));

describe("runtime store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    runtimeMock.reset();
    runtimeMock.detectPython.mockReset();
    runtimeMock.startRun.mockReset();
    runtimeMock.sendInput.mockReset();
    runtimeMock.stopRun.mockReset();
    runtimeMock.onOutput.mockClear();
    runtimeMock.onState.mockClear();
  });

  it("starts a run and appends stdout chunks to the terminal buffer", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
      version: "Python 3.12.0",
      executablePath: "C:/Python312/python.exe",
    });
    runtimeMock.startRun.mockResolvedValue({
      sessionId: "session-1",
      command: "python -u -c <code>",
    });

    await store.runCode('print("hello")');
    runtimeMock.emitOutput({
      sessionId: "session-1",
      stream: "stdout",
      chunk: "hello\n",
    });

    expect(store.terminalOutput).toBe("hello\n");
    expect(store.status).toBe("running");
  });

  it("sends terminal input to a running python session", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockResolvedValue({
      sessionId: "session-1",
      command: "python -u -c <code>",
    });

    await store.runCode("name = input()");
    await store.submitInput("Sunny");

    expect(runtimeMock.sendInput).toHaveBeenCalledWith("session-1", "Sunny");
    expect(store.terminalOutput).toContain("> Sunny");
  });

  it("allows submitting an empty line to a running python session", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockResolvedValue({
      sessionId: "session-1",
      command: "python -u -c <code>",
    });

    await store.runCode("name = input()");
    await store.submitInput("");

    expect(runtimeMock.sendInput).toHaveBeenCalledWith("session-1", "");
    expect(store.terminalOutput).toContain("> \n");
  });

  it("does not start another process while a python session is running", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockResolvedValue({
      sessionId: "session-1",
      command: "python -u -c <code>",
    });

    await store.runCode('print("first")');
    const result = await store.runCode('print("second")');

    expect(result).toBe(false);
    expect(runtimeMock.startRun).toHaveBeenCalledTimes(1);
    expect(store.terminalOutput).toBe("");
    expect(store.status).toBe("running");
  });

  it("does not start another process while python detection is in progress", async () => {
    const store = useRuntimeStore();
    let resolveDetection: (value: {
      available: boolean;
      command: string;
    }) => void = () => undefined;
    const detectionPromise = new Promise<{
      available: boolean;
      command: string;
    }>((resolve) => {
      resolveDetection = resolve;
    });

    runtimeMock.detectPython.mockReturnValue(detectionPromise);
    runtimeMock.startRun.mockResolvedValue({
      sessionId: "session-1",
      command: "python -u -c <code>",
    });

    const firstRun = store.runCode('print("first")');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(store.status).toBe("checking");
    expect(store.isBusy).toBe(true);

    const secondRun = await store.runCode('print("second")');
    expect(secondRun).toBe(false);
    expect(runtimeMock.startRun).not.toHaveBeenCalled();
    expect(store.terminalOutput).toBe("");
    expect(store.status).toBe("checking");

    resolveDetection({ available: true, command: "python" });
    await firstRun;
    await flushPromises();

    expect(runtimeMock.startRun).toHaveBeenCalledTimes(1);
  });

  it("does not start another process while python is starting", async () => {
    const store = useRuntimeStore();
    let resolveStart: (value: {
      sessionId: string;
      command: string;
    }) => void = () => undefined;
    const startPromise = new Promise<{ sessionId: string; command: string }>(
      (resolve) => {
        resolveStart = resolve;
      }
    );

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockReturnValue(startPromise);

    const firstRun = store.runCode('print("first")');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(store.status).toBe("starting");
    expect(store.isBusy).toBe(true);

    const secondRun = await store.runCode('print("second")');
    expect(secondRun).toBe(false);
    expect(runtimeMock.startRun).toHaveBeenCalledTimes(1);
    expect(store.terminalOutput).toBe("");
    expect(store.status).toBe("starting");

    resolveStart({ sessionId: "session-1", command: "python -u -c <code>" });
    await firstRun;
    await flushPromises();

    expect(store.status).toBe("running");
  });

  it("appends final status and exit code when a run completes", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockResolvedValue({
      sessionId: "session-1",
      command: "python -u -c <code>",
    });

    await store.runCode('print("hello")');
    runtimeMock.emitState({
      sessionId: "session-1",
      status: "completed",
      exitCode: 0,
    });

    expect(store.status).toBe("completed");
    expect(store.sessionId).toBeNull();
    expect(store.lastRunState).toEqual({
      sessionId: "session-1",
      status: "completed",
      exitCode: 0,
    });
    expect(store.terminalOutput).toContain("运行完成，退出码 0");
  });

  it("handles a final state event that arrives before startRun resolves", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockImplementation(async () => {
      const session = {
        sessionId: "session-1",
        command: "python -u -c <code>",
      };
      runtimeMock.emitState({
        sessionId: session.sessionId,
        status: "completed",
        exitCode: 0,
      });
      return session;
    });

    const result = await store.runCode('print("hello")');

    expect(result).toBe(true);
    expect(store.status).toBe("completed");
    expect(store.sessionId).toBeNull();
    expect(store.lastRunState).toEqual({
      sessionId: "session-1",
      status: "completed",
      exitCode: 0,
    });
    expect(store.terminalOutput).toContain("运行完成，退出码 0");
  });

  it("does not cache final state events for unknown sessions outside startup", () => {
    const store = useRuntimeStore();

    runtimeMock.emitState({
      sessionId: "stale-session",
      status: "completed",
      exitCode: 0,
    });

    expect(store.pendingStateEvents).toEqual({});
    expect(store.lastRunState).toBeNull();
  });

  it("clears stale pending state events before starting a new run", async () => {
    const store = useRuntimeStore();

    store.pendingStateEvents["stale-session"] = {
      sessionId: "stale-session",
      status: "completed",
      exitCode: 0,
    };
    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockResolvedValue({
      sessionId: "session-1",
      command: "python -u -c <code>",
    });

    await store.runCode('print("hello")');

    expect(store.pendingStateEvents).toEqual({});
    expect(store.status).toBe("running");
  });

  it("appends stopped status after stopping a running session", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockResolvedValue({
      sessionId: "session-1",
      command: "python -u -c <code>",
    });

    await store.runCode("while True: pass");
    await store.stopRun();
    expect(store.status).toBe("stopping");

    runtimeMock.emitState({
      sessionId: "session-1",
      status: "stopped",
      exitCode: null,
    });

    expect(runtimeMock.stopRun).toHaveBeenCalledWith("session-1");
    expect(store.status).toBe("stopped");
    expect(store.terminalOutput).toContain("已停止");
  });

  it("shows a message when stopping without a running session", async () => {
    const store = useRuntimeStore();

    await store.stopRun();

    expect(runtimeMock.stopRun).not.toHaveBeenCalled();
    expect(store.terminalOutput).toContain("当前没有正在运行的 Python 程序");
  });

  it("shows detection failures in the terminal", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockRejectedValue(new Error("invoke failed"));

    const result = await store.runCode('print("hello")');

    expect(result).toBe(false);
    expect(store.status).toBe("python-missing");
    expect(store.python.error).toBe("invoke failed");
    expect(store.terminalOutput).toContain("Python 检测失败: invoke failed");
  });

  it("shows start failures in the terminal", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockRejectedValue(new Error("spawn failed"));

    const result = await store.runCode('print("hello")');

    expect(result).toBe(false);
    expect(store.status).toBe("error");
    expect(store.sessionId).toBeNull();
    expect(store.terminalOutput).toContain("启动 Python 失败: spawn failed");
  });

  it("shows input forwarding failures in the terminal", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockResolvedValue({
      sessionId: "session-1",
      command: "python -u -c <code>",
    });
    runtimeMock.sendInput.mockRejectedValue(new Error("stdin closed"));

    await store.runCode("name = input()");
    await store.submitInput("Sunny");

    expect(store.terminalOutput).toContain("发送输入失败: stdin closed");
  });

  it("shows stop failures in the terminal", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: true,
      command: "python",
    });
    runtimeMock.startRun.mockResolvedValue({
      sessionId: "session-1",
      command: "python -u -c <code>",
    });
    runtimeMock.stopRun.mockRejectedValue(new Error("kill failed"));

    await store.runCode("while True: pass");
    await store.stopRun();

    expect(store.terminalOutput).toContain("停止 Python 失败: kill failed");
  });

  it("enters python-missing state when no interpreter is available", async () => {
    const store = useRuntimeStore();

    runtimeMock.detectPython.mockResolvedValue({
      available: false,
      error: "Python not found",
    });

    const result = await store.runCode('print("hello")');

    expect(result).toBe(false);
    expect(store.status).toBe("python-missing");
    expect(store.terminalOutput).toContain("未检测到可用的 Python 解释器");
  });
});
