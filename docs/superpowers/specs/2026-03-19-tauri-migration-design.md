# Start Your Python Tauri Migration Design

## Overview

This revision migrates `Start Your Python` from Neutralino to Tauri while preserving the current Vue 3 + Vite frontend, the PyCharm-inspired workspace, and the dual-state lesson model.

The migration exists for one primary reason: the current Neutralino-based desktop shell has unstable close behavior on the target Windows environment, even when the application is reduced to a minimal frontend state. The problem is therefore treated as a shell/platform issue, not as a lesson-feature issue.

The correct response is to replace the desktop shell, not to continue spending time on low-confidence Neutralino shutdown debugging.

## Product Goal

After migration:

1. the project should still behave like the current PyCharm-style learning app
2. the desktop app should run through Tauri instead of Neutralino
3. the desktop close behavior should no longer depend on Neutralino window lifecycle behavior
4. the repository should use Tauri as the primary desktop path in docs and scripts

## Migration Strategy

The frontend should be preserved.

### Keep

- Vue 3
- Vite
- Pinia
- Vue Router
- current lesson data
- current PyCharm-style workspace UI
- current dual-state editor/run interaction model
- current frontend tests

### Replace

- Neutralino desktop shell
- Neutralino build workflow
- Neutralino runtime client assumptions
- Neutralino-first packaging path

### Add

- `src-tauri/`
- Tauri config
- Rust desktop entrypoint
- Tauri dev/build scripts

## Project Structure Direction

The intended structure is:

```text
start-your-python
├─ src/                # existing Vue frontend
├─ src-tauri/          # Tauri desktop shell
├─ resources/          # shared icons/assets
├─ package.json
├─ vite.config.ts
└─ README.md
```

The desktop shell should become an infrastructure layer under the existing frontend, not a rewrite trigger.

## Developer Workflow

The desktop workflow should become:

### Web development

```bash
npm run dev
```

### Desktop development

```bash
npm run tauri:dev
```

### Desktop packaging

```bash
npm run tauri:build
```

Neutralino commands may remain temporarily during migration, but Tauri should become the primary documented workflow.

## Scope

This migration should include:

1. initialize a Tauri app in the current repository
2. wire Tauri to the existing Vite frontend
3. make the current frontend run inside Tauri without frontend rewrites
4. set application metadata, icons, and product naming
5. update scripts and docs to prefer Tauri
6. reduce Neutralino from the primary path

## Desktop Behavior Requirements

The migrated Tauri application should:

- open the existing frontend in a desktop window
- allow the window to close normally
- support production packaging through Tauri

No special native integrations are required for this migration beyond a stable window lifecycle.

## Repository Hygiene Direction

This migration should not try to delete every Neutralino-related file immediately. It should instead:

1. establish Tauri as the working path
2. verify Tauri packaging succeeds
3. then demote or remove Neutralino assets from the main workflow

This avoids breaking the repository mid-migration.

## Non-Goals

This migration will not include:

- rewriting the frontend in another framework
- redesigning the lesson model again
- adding complex Rust commands
- implementing auto-updates, tray support, or native menus
- fully purging all Neutralino remnants in the same pass

## Success Criteria

This migration is successful if:

1. `npm run tauri:dev` launches the desktop app successfully
2. `npm run tauri:build` produces a desktop package successfully
3. the existing Vue frontend remains functional in Tauri
4. Tauri replaces Neutralino as the main desktop workflow in docs
5. the repository is positioned for further UI/product work without Neutralino-specific blocking

## Risks

1. trying to clean too much Neutralino baggage during the initial migration could create avoidable instability
2. introducing Rust-side complexity beyond basic Tauri setup would slow delivery
3. frontend assumptions tied to the old shell could surface during migration and need explicit cleanup
4. if the user’s machine lacks required Tauri build prerequisites, setup friction could become the main blocker

## Recommended Next Step

Write an implementation plan focused on:

1. Tauri project initialization
2. npm script and config updates
3. frontend-to-Tauri integration
4. verification of dev/build lifecycle
5. documentation switch from Neutralino to Tauri
