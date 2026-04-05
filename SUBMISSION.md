# Submission

## Assumptions & Priorities

### Priority order
- Typed the full domain first (`types.ts`) — everything else derives from it
- Built the registry before components so the architecture contract was clear
- Implemented all section components before wiring `ResultView`
- Write-up last, after validating the default `data` payload rendered correctly

### Explicit out-of-scope
- **Styling**: Tailwind classes are present in `CalloutSection` and `MetricSection` but Tailwind was not configured. Visual polish was deprioritized in favor of correctness and architecture.
- **`meta` field in list items**: typed and preserved, but not rendered. `meta` appears to be audit-only data — exposing it to end users without a clear product decision felt wrong.
- **Duplicate `id` fields**: handled by falling back to index as React key. No deduplication logic was added — this is a data contract issue, not a UI concern.
- **Fixtures** (`emptyTitle`, `missingSections`, `minimalLegacy`): all handled implicitly by optional chaining and safe defaults in `ResultView` and `TextSection`. No special-case code was added for them.

### With more time
- Configure Tailwind properly and add a consistent design system for section variants
- Add unit tests per component and an integration test rendering the full `data` payload
- Replace `as any` casts in `ResultView` with a proper generic narrowing solution

---

## Reflective Questions

### What did you change and why?
The original `ResultView` had three problems: untyped props (`data: any`), centralized `if/else` dispatch by section type, and no error handling. I replaced all three.

Types were introduced as discriminated unions so TypeScript can narrow each section safely. The `if/else` dispatch was replaced with a registry (`Map<string, ComponentType>`) — adding a new section type now requires zero changes to existing code. Error handling was added at every layer: null checks on `items`, `content`, and `sections`; fallback components for unknown and untyped sections.

### What would you improve next?
Proper Tailwind setup, unit tests per component, and removing the `as any` casts in `renderSection` with a better generic signature.

### How would you scale this if the number of section types grew ~10×?
The registry pattern scales cleanly. Each section type lives in its own file and self-registers — there is no central file that needs to be edited when a new type is added. At 50+ types I would consider lazy-loading renderers via `React.lazy` to avoid bundling unused components.

### How did you handle unknown/invalid data and ambiguous payloads?
- **Unknown type** (e.g. `freetext`): rendered by `UnknownSection` with a visible but unobtrusive message showing the type name. Useful for debugging without crashing the UI.
- **Missing type**: rendered by `UntypedSection`, which attempts to display `content` if present.
- **`items: null`**: guarded with optional chaining — renders nothing silently.
- **Legacy `body` field**: normalized in `TextSection` via `content ?? body`.
- **XSS strings**: React's default escaping handles this — no `dangerouslySetInnerHTML` was used anywhere.
- **Mixed list items** (string vs object): handled in `renderItem` with a `typeof` guard.

### How would you test this?
- **Unit tests** per component: render with valid props, render with missing/null fields, assert no crash and correct output
- **Registry tests**: assert that `getRenderer` returns the correct component for each registered type and `undefined` for unknown types
- **Integration test**: render `ResultView` with the full `data` payload and assert all sections appear without errors
- **Snapshot tests**: for components with variant rendering like `CalloutSection` (info / warning / error)

### Which decision would you revisit first if this went to production tomorrow?
The `as any` casts in `renderSection`. They work correctly at runtime because the registry guarantees the right component receives the right section shape — but they bypass TypeScript's safety. I would revisit this with a generic `renderSection<T extends Section>` approach or a typed registry that maps section types to their specific component signatures.

### Did you use AI tools?
Yes. I used Claude to get a quick schematic overview of the project structure and understand the scope before starting — similar to how I'd use a senior dev for a 10-minute alignment conversation. All architectural decisions, component design, typing strategy, and code were written by me.