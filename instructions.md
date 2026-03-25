# Coinvale Instructions

This file defines the working process for the project.

Core rules:
- Before major changes, collect the intended change list first.
- Code is edited only after the user gives a clear instruction such as `tee ära`, `update`, `change the code`, or `implement`.
- If the discussion is only about ideas, review, or planning, then code is not changed.
- Documentation and reference files must be kept in sync with the relevant changes.

Markdown file maintenance:
- `handoff.md` should stay short and easy to scan.
- `patch-notes.md` should log substantial updates in a patch-note format.
- `patch-notes.md` should also carry removed, dropped, or replaced solutions under a `Removed` category.
- `implemented.md` should describe what is actually working in the game.
- `roadmap.md` should describe upcoming topics, balance concerns, and next steps.
- `buildings.md`, `workers.md`, and `tech-tree.md` should remain human-readable system documents.
- If an important change is made, the related markdown files must be updated in the same pass.
- None of these files should be left stale if the change affects their content.

Reference files:
- structured reference lives in `reference/`
- system descriptions are stored there as `JS` files
- for now they are support documentation and reference, not the runtime source of truth
- if the project later moves toward a more modular architecture, `index.html` may start consuming them directly
- when a system changes in an important way, the related `reference/*.js` file should be updated in the same pass

Workflow before changes:
1. Read `handoff.md`.
2. Check `implemented.md`, `roadmap.md`, `patch-notes.md`, and the system docs when needed.
3. Collect the planned change list.
4. Wait for clear user approval before changing code.

Workflow after changes:
1. Update `implemented.md` if something truly went into the game.
2. Update `patch-notes.md` for every substantial update batch.
3. Update `roadmap.md` if priorities or next topics changed.
4. Record removed or replaced solutions in `patch-notes.md` under `Removed`.
5. Update `buildings.md`, `workers.md`, or `tech-tree.md` if system behavior changed.
6. Update the related `reference/*.js` file if the system reference changed.
7. Update `handoff.md` so the next conversation can resume quickly.
8. Always check that all related files are aligned and do not describe different project states.

Additional principles:
- Keep logs understandable, not merely long.
- Always separate:
  - what is already done
  - what is planned
  - what has been removed
- Also separate:
  - human-readable documentation
  - structured reference
- If a decision changes project direction, write that clearly into the markdown files.

Goal:
- At any time, the project should be easy to understand:
  - what existed before
  - what exists now
  - what comes next
