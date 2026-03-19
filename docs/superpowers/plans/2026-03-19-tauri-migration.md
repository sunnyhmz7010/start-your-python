# Start Your Python Tauri Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `Start Your Python` from Neutralino to Tauri while preserving the current Vue 3 + Vite frontend and making Tauri the primary desktop development and packaging path.

**Architecture:** Keep the existing frontend as-is and add a Tauri shell in `src-tauri/` that points at the existing Vite app. Update npm scripts and docs so web development remains unchanged while desktop workflows move to `tauri:dev` and `tauri:build`. Neutralino should be demoted from the main path rather than ripped out immediately.

**Tech Stack:** Vue 3, TypeScript, Vite, Pinia, Vue Router, Tauri, Rust, Vitest

---

## File Structure

### Existing files to modify

- `package.json`
- `README.md`
- `.gitignore`
- `resources/icons/appIcon.svg`
- `index.html`
- `vite.config.ts`

### Files to create

- `src-tauri/Cargo.toml`
- `src-tauri/build.rs`
- `src-tauri/tauri.conf.json`
- `src-tauri/src/main.rs`
- `src-tauri/icons/*` (generated or copied app icons)
- `tests/docs/desktopWorkflow.md` (optional lightweight doc if needed)

### Files to demote from main workflow

- `neutralino.config.json`
- `resources/js/neutralino.js`
- `resources/js/neutralino.d.ts`
- `bin/neutralino-*`
- `neu:dev`
- `neu:build`

## Task 1: Verify current frontend baseline before shell migration

**Files:**
- No file changes yet

- [ ] **Step 1: Run the current frontend checks**

Run: `npm run test`
Expected: PASS

Run: `npm run typecheck`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 2: Record that the frontend baseline is green before introducing Tauri**

Expected: current Vue app is healthy and desktop migration can be isolated to the shell layer

## Task 2: Add Tauri dependencies and desktop scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add Tauri CLI and app dependencies**

```json
{
  "devDependencies": {
    "@tauri-apps/cli": "..."
  },
  "dependencies": {
    "@tauri-apps/api": "..."
  }
}
```

- [ ] **Step 2: Add Tauri scripts**

```json
{
  "scripts": {
    "tauri:dev": "tauri dev",
    "tauri:build": "tauri build"
  }
}
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`
Expected: PASS

## Task 3: Initialize the Tauri shell in `src-tauri`

**Files:**
- Create: `src-tauri/Cargo.toml`
- Create: `src-tauri/build.rs`
- Create: `src-tauri/tauri.conf.json`
- Create: `src-tauri/src/main.rs`

- [ ] **Step 1: Create a minimal Tauri Rust entrypoint**

```rust
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

- [ ] **Step 2: Create a minimal Cargo manifest**

```toml
[package]
name = "start-your-python"
version = "1.1.0"
edition = "2021"
```

- [ ] **Step 3: Point Tauri at the Vite frontend**

```json
{
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build",
    "devPath": "http://localhost:5173",
    "frontendDist": "../build"
  }
}
```

- [ ] **Step 4: Set the product name and window title**

```json
{
  "productName": "Start Your Python"
}
```

## Task 4: Add icons and basic Tauri app metadata

**Files:**
- Modify: `resources/icons/appIcon.svg`
- Create/Populate: `src-tauri/icons/*`
- Modify: `src-tauri/tauri.conf.json`

- [ ] **Step 1: Reuse the existing app icon as the Tauri source icon**

Expected: the current icon asset becomes the input for Tauri icons

- [ ] **Step 2: Populate Tauri icon paths**

```json
{
  "bundle": {
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/icon.ico"
    ]
  }
}
```

- [ ] **Step 3: Keep metadata minimal**

Expected: no native features beyond a basic app name, identifier, and icons

## Task 5: Make Tauri the primary desktop workflow

**Files:**
- Modify: `README.md`
- Modify: `package.json`

- [ ] **Step 1: Update README desktop commands**

```md
## Desktop development

```bash
npm run tauri:dev
```

## Desktop build

```bash
npm run tauri:build
```
```

- [ ] **Step 2: Demote Neutralino commands in docs**

Expected: Neutralino is no longer the recommended desktop path

- [ ] **Step 3: Keep old scripts only if needed temporarily**

Expected: the repository can still contain old files, but the documented path is Tauri-first

## Task 6: Verify Tauri development and packaging lifecycle

**Files:**
- Modify as needed based on verification failures

- [ ] **Step 1: Run Tauri dev**

Run: `npm run tauri:dev`
Expected: app launches in a Tauri desktop window

- [ ] **Step 2: Run Tauri build**

Run: `npm run tauri:build`
Expected: desktop package is produced successfully

- [ ] **Step 3: Re-run frontend checks**

Run: `npm run test`
Expected: PASS

Run: `npm run typecheck`
Expected: PASS

Run: `npm run build`
Expected: PASS

## Task 7: Add minimal repository hygiene for the new shell setup

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Ignore Tauri build outputs**

```gitignore
src-tauri/target/
```

- [ ] **Step 2: Keep Node/Vite ignores intact**

Expected: no regression in existing ignore rules

## Notes for execution

- Do not rewrite the frontend during migration.
- Prefer the smallest working Tauri shell first.
- Do not try to solve every icon or bundling edge case before the app launches.
- If Tauri setup fails because machine prerequisites are missing, surface that immediately with the exact error.
