# Start Your Python v1.1 Design

## Overview

`Start Your Python` v1.1 is a maintainable MVP for Python beginners who want an IDE-like learning experience without the overhead of a full development environment.

The product direction stays centered on immersive IDE-style learning, but the implementation must be reduced to a realistic scope that can be shipped, maintained, and extended. The first target release is a local-first desktop/web learning app with a clean path toward future remote content updates.

## Target User

- Python beginners learning on their own
- Users who benefit from structured lessons presented inside a familiar editor-style workspace
- Users who do not need accounts, cloud sync, or advanced online services in the first release

## Product Goals

1. Provide an IDE-style learning interface that feels more like using a coding tool than reading a static tutorial page.
2. Deliver a clear self-study loop: choose a lesson, read guided content, complete steps, and track progress.
3. Keep the codebase maintainable enough for incremental releases instead of one-off demo hacking.
4. Preserve a future integration point for remote lesson delivery without requiring that infrastructure in v1.1.

## Non-Goals

The v1.1 release will not include:

- Real local Python execution
- Account systems or cloud sync
- Admin backoffice or CMS
- AI tutor/chat features
- Complex automatic grading
- Community or collaboration features

## Release Positioning

This release should be treated as `v1.1.0`, not as a brand new rewrite. The intent is to stabilize the current prototype into a credible open source learning application with a realistic maintenance baseline.

## Core User Experience

The primary user flow is:

1. Open the application
2. Resume the latest lesson or select a new lesson from the course tree
3. Read lesson content in the central learning area
4. Follow guided steps in the right-side panel
5. Mark progress through the lesson
6. Return later and continue from saved local progress

The app should feel like an editor-based study environment rather than a standard content website.

## Functional Scope

### 1. Course Navigation

The application must support:

- Chapter and lesson tree navigation
- Selected lesson highlighting
- Completed lesson indicators
- A visible way to continue recent learning

### 2. Main Learning Area

The center panel is the main teaching surface. It should present:

- Lesson title and summary
- Core explanation content
- Example code and formatted reference content
- Context that matches the currently selected step

The main area must not behave like a fake full IDE. It should be honest about being a guided learning surface inside an IDE-like shell.

### 3. Guided Step Panel

The right-side panel should drive the lesson as a sequence of approachable actions:

- Read concept
- Inspect example
- Think through prompt
- Complete small practice

This panel is the main mechanism for keeping lessons structured and finishable.

### 4. Bottom Information Panel

The bottom panel should keep the IDE metaphor while showing useful content only. Tabs should be reframed around meaningful learning signals such as:

- Study tips
- Lesson summary
- Practice feedback

Decorative fake terminal behavior should be minimized.

### 5. Local Progress Tracking

The application must persist enough local state to support a real return-to-learning workflow:

- Completed lessons
- Current lesson step
- Recent lesson
- Aggregate completion progress

## Content Architecture

The codebase should treat lesson content as a separate content source rather than hardwiring presentation logic into the main view.

### Required direction

- Keep a single lesson data model
- Keep the current built-in content source for v1.1
- Add a content access layer that can later swap to a remote JSON source

### Future-ready requirement

Remote lesson updates are not in scope for this release, but the structure must avoid blocking them. The content-loading path should be designed so that moving from embedded data to fetched data is an additive change, not a rewrite.

## State Design

State should be separated into two clear concerns.

### Content State

Responsible for:

- Chapters and lessons
- Current lesson
- Current step
- Content lookup and selection

### Learning State

Responsible for:

- Completion records
- Recent learning
- Progress summary
- Persisted local study state

This separation is needed so future remote content changes do not pollute the learning-progress logic.

## Engineering Design

### View Decomposition

`src/views/HomeView.vue` is currently overloaded and should be decomposed into focused components. The implementation should move toward a structure such as:

- lesson tree/navigation component
- main lesson panel component
- guided steps component
- bottom panel component
- shared lesson presentation helpers

The goal is to reduce single-file complexity and make future edits localized.

### Data and Type Boundaries

Lesson types should be normalized and reused consistently. Content data should be loaded through focused modules instead of ad hoc view-level wiring.

### Repository Hygiene

The repository should be cleaned so it looks like a project under maintenance, not a local dump. This includes:

- ignoring generated artifacts
- removing accidental binaries/logs from tracked source where appropriate
- documenting the supported dev/build workflow

### Quality Baseline

The project needs a minimum repeatable validation path. At minimum:

- `npm run build`
- `npm run typecheck`

Optional linting can be added if it is low-friction, but the immediate requirement is a dependable release baseline.

### Documentation Direction

README should be rewritten to match the actual product honestly:

- what the app is
- who it is for
- what works today
- what is planned next
- how to run and build it

The current language should be reduced from exaggerated claims to maintainable project documentation.

## Milestones

### Milestone 1: Stabilize the MVP shell

- clean repository noise
- add missing quality scripts
- clarify current project positioning

### Milestone 2: Refactor the main learning interface

- split `HomeView.vue`
- formalize lesson/content boundaries
- improve panel responsibilities

### Milestone 3: Strengthen the learning loop

- recent lesson support
- reliable progress persistence
- clearer lesson completion feedback

### Milestone 4: Prepare for future remote content

- content access abstraction
- local-first provider with future remote provider extension point

## Success Criteria

The release is successful if:

1. A new user can open the app and understand how to start learning within seconds.
2. A user can move through lessons and come back later without losing progress.
3. The repository has a credible structure, docs, and validation workflow for future maintenance.
4. The codebase can later adopt remote lesson updates without replacing the UI architecture.

## Risks

1. The current UI may over-invest in mimicking an IDE, which can distract from actual learning flow.
2. The overloaded main view may slow down safe iteration if not decomposed early.
3. If the content model remains coupled to presentation, future remote updates will be costly.
4. If repository cleanup is postponed, each new release will remain harder to trust and maintain.

## Recommended Next Step

Write an implementation plan for `v1.1.0` that focuses on:

1. repository cleanup and validation scripts
2. lesson/content architecture cleanup
3. home view decomposition
4. progress and recent-learning polish
5. README and release-facing documentation refresh
