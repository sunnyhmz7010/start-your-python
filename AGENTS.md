# AGENTS.md

## Reusable Rules

These rules are intentionally written in a reusable way so they can be copied into other repositories as a starting point.

- This repository's `Reusable Rules` section is intended to be the shared baseline across projects. By default, other project `AGENTS.md` files should keep these reusable rules aligned in structure, intent, and policy unless the user explicitly asks for a deliberate deviation.

### General Working Style

- Prefer minimal, targeted changes over broad refactors.
- Preserve existing product copy unless the task requires rewriting it.
- Keep user-facing docs concise and practical; avoid adding AI collaboration notes or marketing filler unless explicitly requested.
- If a repository maintains a public-facing root `README.md`, keep it user-facing and promotional for external readers. Contributor rules, operational constraints, missing-work notes, AI guidance, release-process conventions, and collaboration guidance belong in `AGENTS.md`, not `README.md`.
- Do not create repository subdirectories such as `docs/`, `notes/`, `tmp/`, or similar just to store AI handoff notes, internal architecture summaries, release drafting scratch files, or collaboration-only guidance. Put that material in `AGENTS.md` unless the user explicitly asks for a separate file or directory.
- If a repository maintains a public-facing root `README.md`, follow the style of strong, high-star GitHub project READMEs: lead with clear value, polished feature framing, concise usage/integration guidance, and externally useful examples.
- If a repository maintains a public-facing root `README.md`, prefer the current polished README pattern used in this repository family: a centered hero block with logo, project name, one-sentence value summary, badges, and primary links first; then a short “why this exists” section, screenshot preview, core capability breakdown, quick start, usage/integration examples, feature details, local development, security reporting, license, and other public project metadata.
- If a repository maintains a public-facing root `README.md`, keep README section order user-journey oriented: what it is, why it matters, what it can do, how to start, how to use/integrate it, then contributor-facing local development notes. Do not lead with developer setup, internal architecture, or maintenance workflow.
- If a repository maintains a public-facing root `README.md`, group capability sections by user-facing surface or scenario, using short subsections plus concise bullet lists. Prefer concrete capability statements over abstract architecture descriptions.
- If a repository maintains a public-facing root `README.md`, include copyable real examples for routes, commands, Finder calls, APIs, or embed snippets when the product exposes them. Keep examples minimal but directly runnable or adaptable.
- If a repository maintains a public-facing root `README.md`, it is acceptable to use light decoration such as emoji section headings, centered screenshots, badges, and concise call-to-action links, as long as the page still reads cleanly and professionally.
- If a repository maintains a public-facing root `README.md`, keep paragraphs and bullet lists tight. Prefer a few high-signal bullets over long prose blocks, and avoid repeating the same capability in multiple sections unless each repetition adds new context.
- If a repository maintains a public-facing root `README.md`, prefer a direct product-description leading sentence instead of starting with the repository name or "This project is ...", unless the user explicitly asks for that phrasing.
- If a repository maintains a public-facing root `README.md`, do not add sections framed as internal progress tracking or roadmap bookkeeping, such as “当前已实现”, “当前缺失”, “后续里程碑”, “未来计划”, or similar wording.
- If a repository maintains a public-facing root `README.md`, do not use “当前…” style internal status phrasing unless the user explicitly requests it. README should read like a polished public-facing project page, not an internal handoff note.
- In public-facing docs such as a root `README.md`, write commands using standard upstream tooling, not local wrappers, aliases, shell functions, or private helper commands. Keep local convenience commands in contributor-only docs such as `AGENTS.md`.
- For searches, prefer `rg`.
- Use `apply_patch` for manual edits when the environment is stable.
- Do not run destructive git commands unless explicitly requested.

### Validation And Hygiene

- Keep the working tree clean before handoff: do not leave local build outputs, dependency caches, screenshots for debugging, or temporary troubleshooting files committed or untracked.
- When the environment lacks the required toolchain and the user does not need full local verification, it is acceptable to skip heavy verification, but say so explicitly.
- Release notes are user-facing change logs. Do not include internal verification/process statements such as having run tests, builds, audits, or CI checks unless explicitly requested.
- When repository structure, commands, external capabilities, release process, or recurring engineering pitfalls change, update `AGENTS.md` in the same task. Keeping this file current is required, not optional.
- If newly learned guidance appears to be reusable across repositories rather than specific to the current project, ask whether to automatically scan other project `AGENTS.md` files, apply the shared rule where appropriate, and push those updates to their remotes.
- For GitHub-hosted repositories, maintain the baseline repository-governance files consistently across projects unless the user explicitly asks for divergence. This baseline includes `LICENSE`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, issue templates, and similar repo-health/community files.
- "Consistently" does not mean every line must be identical. Keep the structure, tone, and policy baseline aligned, but make the necessary project-specific substitutions for repository name, product name, links, version fields, platform fields, security scope, issue-form fields, and other repo-specific facts.
- If one of those GitHub governance files is added, removed, or materially changed in a way that should become the new shared baseline, ask whether to propagate the same baseline change across other GitHub repositories and push the updates, while still preserving required project-specific substitutions.

### Security And Review

- Review code with a bug-risk mindset first. Prioritize functional regressions, security issues, breaking changes, and missing tests before style or cleanup suggestions.
- If code returns `text/html` built from server-side string templates, HTML-escape all text fields from settings, persisted data, and user-controlled input before interpolating them into tags such as `<title>`, headings, attributes, or inline scripts.
- Do not assume only frontend `innerHTML` paths are XSS-relevant. Also inspect backend-rendered HTML, email templates, CMS fragments, and any raw string formatting that bypasses auto-escaping.
- For admin permission checks, prefer no-side-effect probes against real resources.
- Do not use invalid create requests to probe permissions; validation failures can mask the real authorization result and create misleading server logs.

### Dependency And Upgrade Rules

- Do not merge dependency or toolchain bumps just to clear security alerts or Dependabot PRs. First confirm the repo's current config is compatible and all required CI/build/test steps stay green.
- Treat build-tool upgrades such as `vite`, bundlers, editors, framework compilers, and test runners as compatibility work, not routine version bumps. If the upgrade breaks the build, defer it or patch it properly instead of merging a red PR.
- When a security alert applies only to dev tooling or to a runtime mode the project does not use, verify the real exposure before escalating. Distinguish "reported in the dependency graph" from "actually exploitable in this repo."

### Release Rules

- Rewrite stable release notes from the commits actually included by the published tag. Do not mix in changes that landed only on `main` after that tag.
- When converting prereleases into a stable release, aggregate the effective user-visible changes across the prerelease cycle instead of copying beta notes verbatim.
- If replacing or deleting an older release in favor of a newer one, compare the old tag, the new tag, and the default branch separately so unreleased work is not accidentally documented.
- Do not promote a prerelease to a stable `vX.Y.Z` release unless the user explicitly asks for that exact stable release.
- GitHub release titles should default to the bare tag name such as `v0.1.0` or `v0.1.0-beta.1`, not `ProjectName v0.1.0`, unless the user explicitly asks for a product-prefixed title.

## Repository-Specific Rules

This repository is `start-your-python`, a desktop learning app for Python beginners.

## Project Summary

- Product goal: provide a local beginner-friendly Python learning workspace, not a full IDE.
- UX direction: PyCharm-style workspace with course tree, editor, lesson content, and real terminal execution.
- Main audience: Chinese-speaking Python beginners.
- Current app version: `1.1.0`

## Tech Stack

- Frontend: `Vue 3`
- Build tool: `Vite`
- State: `Pinia`
- Desktop shell: `Tauri`
- Mobile shell: `Capacitor`
- Testing: `Vitest`
- Language: `TypeScript`

## Important Paths

- App entry and UI source: `src/`
- Tauri shell: `src-tauri/`
- Course content: `content/lessons/`
- Course images: `public/course-images/`
- Tests: `tests/`
- Scripts: `scripts/`
- User docs: `README.md`

## Product Constraints

- This app is not a cloud IDE.
- Do not introduce account systems, cloud sync, or AI chat unless explicitly requested.
- Prefer preserving the current local learning tool framing.
- Preserve Chinese product copy unless the task is specifically about rewriting copy.
- Course content is sourced from real `.py` files under `content/lessons/`.

## Runtime Model

- The app can render lesson content and code examples from lesson files.
- Code blocks can invoke the system Python interpreter in the desktop Tauri app.
- Terminal behavior should support:
  - stdout
  - stderr
  - `input()` style interaction
- Python runtime is external to the app. The app does not bundle Python.
- Mobile mode is a reader-oriented course experience and does not depend on system Python.

## Development Commands

- Install dependencies:
  - `npm install`
- Web development:
  - `npm run dev`
- Type check:
  - `npm run typecheck`
- Tests:
  - `npm run test`
- Web build:
  - `npm run build`
- Mobile web build:
  - `npm run build:mobile`
- Tauri development:
  - `npm run tauri:dev`
- Tauri build:
  - `npm run tauri:build`
- Release packaging:
  - `npm run tauri:release`

## Windows Build Notes

- Tauri work requires Rust toolchain.
- Windows desktop build also requires Visual Studio Build Tools with C++ components.
- Existing npm scripts already append Cargo bin path before Tauri commands. Preserve that behavior.

## Codebase Notes

- Workspace-related UI is under `src/components/workspace/`.
- Content parsing and loading are under `src/services/content/`.
- Python execution and environment detection are under `src/services/runtime/`.
- Learning progress, recent study state, and terminal state are under `src/stores/`.
- Markdown lesson content is rendered through `src/components/content/MarkdownContent.vue`; keep `src/utils/sanitizeHtml.ts` in place before any `v-html` rendering.
- Keep changes targeted. Avoid broad UI rewrites unless requested.

## Repository Release Conventions

- Version tags follow this style:
  - stable: `v1.2.0`
  - prerelease example: `v1.2.1-beta.1`
- When releasing:
  - update `package.json`
  - update `src-tauri/Cargo.toml`
  - update `src-tauri/tauri.conf.json`
  - keep `README.md` current if packaging targets, screenshots, runtime behavior, or capability descriptions change
- GitHub release titles should follow the reusable rule and use bare tag names.
- Release notes should use the heading `## 更新内容`.
- Release history is maintained in GitHub Releases. Do not add a committed `CHANGELOG.md` unless explicitly requested.
- GitHub Actions CI is defined in `.github/workflows/ci.yaml` and runs on pushes and pull requests to `main`.
- GitHub Actions CD is defined in `.github/workflows/cd.yaml` and runs on the `Release published` event.
- CD uploads Windows installer/bundle outputs, the portable Windows zip, and the signed Android release APK to the GitHub Release.
- Windows portable zip filenames must include version and platform, for example `StartYourPython-v1.2.0-win-x64.zip`.
- Windows CD publishes only the x64 portable zip:
  - `StartYourPython-v1.2.0-win-x64.zip`
- Windows portable zip contents must be rooted directly at `Start Your Python.exe` plus `content/`; do not wrap them in an extra top-level folder.
- The executable inside the Windows portable zip must keep the fixed product name `Start Your Python.exe`, without a version in the executable filename.
- Android APK filenames must include the version tag and ABI, for example `StartYourPython-v1.2.0-android-arm64-v8a-release.apk`.
- Android CD builds separate signed release APKs for `armeabi-v7a` and `arm64-v8a` instead of a debug APK or universal APK.
- Android release signing in CD requires GitHub Secrets named `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, and `ANDROID_KEY_PASSWORD`.
- Android package name is `com.sunny.startyourpython`.
- The Android release keystore is kept in the project-local ignored `release-signing/` directory and must not be committed. Keep this private local backup plus the matching GitHub Actions secrets so future APK updates can use the same signing identity.
