# Structured UI Renderer – Refactoring Challenge

## 🚀 Overview
This is a refactor of a data-driven UI rendering system. The goal was to transform a fragile, hard-to-maintain component into an extensible, type-safe, and resilient architecture capable of handling inconsistent API contracts.

## 🏗️ Architecture: The Registry Pattern
The core improvement was replacing centralized conditional logic (`if/else`) with a **Registry Pattern**.
* **Decoupling**: Each section type (`text`, `list`, `metrics`, `callout`, etc.) has its own isolated functional component.
* **Extensibility**: To add a new section type, you simply create the component and register it in the `sectionRegistry`. The main `ResultView` remains untouched.
* **Type Safety**: Leveraging TypeScript **Discriminated Unions**, we ensure each component receives exactly the props it expects, effectively eliminating the use of `any`.

## 🛠️ Engineering Decisions & Assumptions

### Priorities & Strategy
* **Resilience (Graceful Degradation)**: Priority was given to preventing application crashes. I implemented `UntypedSection` and `UnknownSection` to handle missing or unmapped `type` fields safely.
* **Legacy Support**: The `TextSection` is designed to be backward compatible, accepting both the modern `content` key and the legacy `body` key.
* **Security (XSS)**: The payload contained strings with `<script>` tags. By using standard React JSX curly braces `{content}`, strings are automatically escaped, preventing script injection attacks.
* **Heterogeneous Lists**: List items are treated as mixed types (strings or objects). The `ListSection` identifies the shape and renders accordingly.

### Out of Scope
* **Complex HTML Sanitization**: Beyond React's built-in protection, heavy sanitization libraries (like DOMPurify) were omitted for this 1-2 hour scope.
* **Advanced Layouts**: Styling focuses on basic readability and structure using Tailwind CSS.

## ❓ Reflective Questions

**1. What did you change and why?**
I moved the rendering logic out of `ResultView` into a `sectionRegistry`. This follows the Open/Closed Principle (SOLID), allowing the system to grow without turning the main file into a "God Component".

**2. How would you scale this if the number of section types grew 10x?**
I would implement **Code Splitting** (via `React.lazy`) within the registry. This ensures the browser only loads components for the sections present in the current payload, keeping the initial bundle size small.

**3. How did you handle unknown/invalid data?**
I created two specific fallback components: one for objects missing a `type` field and another for types not yet mapped in our system. These provide visual feedback in development/production instead of a blank screen or a crash.

**4. How would you test this?**
* **Unit Tests**: Testing individual sections (e.g., verifying `MetricSection` renders correctly with a `0` value).
* **Integration Tests**: Validating that `getRenderer` returns the correct component for a given type string.
* **Snapshot Testing**: Ensuring the `ResultView` generates the expected structure when given the `mockData.ts` payload.

**5. Which decision would you revisit first if this went to production tomorrow?**
The **Key Strategy**. Currently, it uses `id ?? index`. In a real production environment with potentially duplicate IDs from a legacy API, I would implement a unique hash or prefix to ensure React's reconciliation doesn't fail.

## 🚀 How to Run
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`

---
*Note: This project uses **Tailwind CSS** for styling and **TypeScript** for type safety.*