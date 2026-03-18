# Start Your Python PyCharm New UI Dual-State Design

## Overview

This revision repositions `Start Your Python` as a PyCharm-inspired learning application that must feel much closer to the real PyCharm New UI Dark experience while keeping the core product goal: teaching Python through structured lessons.

The key product correction is a dual-state interaction model:

1. **Editor State**: the user sees a `.py` lesson file in an IDE-like editor
2. **Run State**: clicking `Run` activates a PyCharm-like execution flow and reveals the actual course content

The app should no longer look like a generic learning dashboard wrapped in dark colors. It should look like an IDE first, and only then reveal educational content.

## Product Goal

The first screen should make the user feel like they opened a Python project in PyCharm.

The learning flow should feel like:

1. Open a lesson file such as `第一课.py`
2. Inspect the pseudo Python lesson code
3. Click `Run`
4. Watch the IDE switch into a guided course mode
5. Continue through steps while the bottom `Run` tool window logs learning progress

## Core UX Model

### 1. Editor State

This is the default state when a lesson file is selected.

Required behavior:

- The left panel shows lesson files as `.py`
- The center editor shows pseudo Python lesson code
- The UI resembles PyCharm New UI Dark layout and proportions
- The bottom tool windows are present but mostly idle
- The right-side panel is minimal or inactive

This state should feel like browsing a Python project.

### 2. Run State

This state begins when the user clicks the Run button.

Required behavior:

- The bottom `Run` tool window becomes active immediately
- The center workspace switches from pseudo code view to real lesson content view
- The right-side panel becomes a lightweight IDE-style learning navigator
- The current step is highlighted and synced
- The Run panel shows teaching-oriented execution output, not fake real Python execution logs

This state should feel like “running the lesson file” and entering a guided interactive explanation.

### 3. Course Switching

When the user selects a different lesson file:

- The IDE returns to that lesson’s Editor State by default
- The pseudo code for that lesson is displayed
- The lesson only enters Run State after the user explicitly clicks Run

This separation is important so file navigation feels IDE-native.

## Visual Direction

The target is **PyCharm New UI Dark**, not the older classic Darcula layout and not a generic dark web app.

### Required layout zones

1. **Top frame**
   - New UI style header/toolbar
   - Run button in a believable IDE location
   - Minimal app branding

2. **Left tool stripe + Project panel**
   - Narrow stripe at far left
   - Project tool window beside it
   - Course files rendered as `.py` entries

3. **Center editor area**
   - Editor tabs
   - Breadcrumb or lightweight file path
   - Main content area that can swap between Editor State and Run State

4. **Bottom tool windows**
   - At minimum: `Problems`, `Terminal`, `Run`
   - `Run` is the key active teaching window

5. **Status bar**
   - Lightweight IDE-style bottom status presentation

6. **Right-side auxiliary panel**
   - Only meaningful in Run State
   - Must look like an IDE side tool window, not a website sidebar

## Functional Scope

This revision should implement the following behaviors:

### 1. Lesson Files in Project Tree

The lesson list must appear as Python files, for example:

- `第一课.py`
- `第二课.py`
- `第三课.py`

The file tree should not feel like a card-based course list.

### 2. Editor-State Rendering

Selecting a lesson file should show:

- the lesson tab
- the pseudo Python lesson source
- inactive or low-noise side panels

### 3. Run-State Rendering

Clicking Run should:

- activate the bottom `Run` tab
- switch the center panel into course content mode
- surface the current lesson explanation
- activate right-side step navigation

### 4. Step Progression

While in Run State:

- step changes update the main lesson content
- step changes append output to the Run tool window
- step completion updates local progress

### 5. Resume Learning

The app should still remember:

- recent lesson
- current step
- completion state

But resume behavior should not break the dual-state model. A resumed lesson may restore step progress, but the app should still preserve the distinction between “file selected” and “lesson running”.

## Run Tool Window Content

The `Run` panel should not pretend to be real Python execution output.

It should instead present **teaching-oriented run output** such as:

- lesson started
- current topic
- current step
- prompt to inspect code
- prompt to continue
- lesson completed

The visual shell should feel like PyCharm, but the content should remain educational and honest.

## Engineering Design

### 1. Workspace State Split

The UI should explicitly model:

- selected lesson file
- workspace mode: `editor` or `run`
- current lesson step
- active bottom tool tab

This avoids mixing “opened file” state with “running lesson” state.

### 2. Component Boundaries

The home workspace should be organized into focused responsibilities:

- top frame / toolbar
- project tree
- editor shell
- run-mode lesson panel
- bottom tool windows
- right-side run navigator

These boundaries should align with PyCharm-like layout structure.

### 3. Preserve Existing Content Model Where Possible

The existing lesson content model can remain, but rendering logic must change so the same lesson data supports two different UI states:

- pseudo code view
- run content view

### 4. Progress and Persistence

Progress persistence should remain local-first. It must integrate with the new dual-state UI without forcing the app into run mode unintentionally.

## Non-Goals

This revision will not include:

- actual Python execution
- embedded interpreter
- APK/mobile packaging
- AI tutoring
- cloud sync
- full parity with every PyCharm behavior

The target is a convincing PyCharm-like learning shell with a working lesson flow, not a full IDE clone.

## Success Criteria

This revision is successful if:

1. On first open, the app visibly resembles PyCharm New UI Dark much more than the current version.
2. Lesson navigation feels like opening `.py` files inside a project.
3. Clicking Run creates a clear state transition from pseudo code viewing into lesson execution.
4. The bottom `Run` panel and the lesson content stay synchronized.
5. The course flow remains usable instead of being a purely visual mockup.

## Risks

1. Over-restyling without a clear state model will break learning behavior again.
2. Overloading the run window with too much prose will make it feel unlike an IDE.
3. Allowing auto-resume to immediately force run mode may confuse the file-based interaction model.
4. Chasing perfect visual parity without scope control can delay shipping.

## Recommended Next Step

Write an implementation plan focused on:

1. PyCharm New UI frame reconstruction
2. dual-state workspace state model
3. run tool window behavior
4. lesson file tree rendering
5. persistence updates for editor/run separation
