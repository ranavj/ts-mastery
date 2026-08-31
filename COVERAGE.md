# ✅ Coverage Matrix — TypeScript + JS + System Design + Patterns

> Scope: **Build Your Own Redux** (Weeks 1–6) + **Build Your Own TanStack Query** (Weeks 7–12).
> Yeh matrix 4 axes track karta hai — sirf TypeScript syntax nahi, balki poori "senior engineer"
> picture: TS features, JS runtime concepts, named software design patterns, aur system-design
> decisions. Har hafte ke end mein update karo.

**Legend:** ⬜ Not started · 🟡 In progress · ✅ Done

---

## 1. TypeScript Topics (Handbook-derived)

| Topic | Week | Covered in | Status |
|---|---|---|---|
| Generics (constraints, inference, defaults) | 1 | `redux/src/core` | ✅ |
| Function Overloads | 1 | `redux/src/core` | ⬜ |
| Discriminated Unions + exhaustiveness (`never`) | 2 | `redux/src/core` | ⬜ |
| Mapped Types, `keyof` | 2 | `redux/src/core` (combineReducers) | ⬜ |
| Higher-order generic functions | 3 | `redux/src/core` (middleware) | ⬜ |
| Function composition types | 3 | `redux/src/core` (compose) | ⬜ |
| Generic composition / variance | 4 | `redux/src/core` (enhancers) | ⬜ |
| Generics across module boundary (store ↔ React) | 5 | `redux/src/react` | ⬜ |
| Custom hook typing | 5 | `redux/src/react` | ⬜ |
| `infer` keyword | 6, 10 | `redux` (createSlice), `query` (useQuery) | ⬜ |
| Advanced Mapped Types (key remapping `as`) | 6 | `redux/src/core` (createSlice) | ⬜ |
| Conditional Types | 10 | `query/src/core` | ⬜ |
| Template Literal Types | 11 | `query/src/core` (key matching) | ⬜ |
| Utility Types in practice (`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`, `Awaited`) | throughout | both packages | ⬜ |
| Module Augmentation / Declaration Merging | 4 | `redux` (DevTools bridge types) | ⬜ |

## 2. JavaScript Runtime Concepts

| Topic | Week | Covered in | Status |
|---|---|---|---|
| Closures (private state, no class) | 1 | `redux/src/core` | ✅ |
| Context API | 5 | `redux/src/react` | ⬜ |
| Referential equality / memoization | 5 | `redux/src/react` (selectors) | ⬜ |
| Proxy (mutation interception) | 6 | `redux/src/core` (createSlice draft) | ⬜ |
| Structural sharing (immutability without full copy) | 6 | `redux/src/core` | ⬜ |
| `Map` / `WeakMap` | 7 | `query/src/core` (cache) | ⬜ |
| Query-key hashing (object → stable string) | 7 | `query/src/core` | ⬜ |
| Microtask batching (`queueMicrotask`, batched notify) | 8 | `query/src/core` | ⬜ |
| Timers (`setTimeout` for stale/gc) | 9 | `query/src/core` | ⬜ |
| Promise deduplication (in-flight sharing) | 9 | `query/src/core` | ⬜ |

## 3. Software Design Patterns

| Pattern | Week | Covered in | Status |
|---|---|---|---|
| Observer Pattern | 1, 8 | `redux` (subscribe), `query` (QueryObserver) | 🟡 |
| Middleware / Chain-of-Responsibility | 3 | `redux/src/core` | ⬜ |
| Composition / Decorator-ish (enhancers) | 4 | `redux/src/core` | ⬜ |
| Singleton | 7 | `query/src/core` (QueryClient) | ⬜ |
| Facade | 7 | `query/src/core` (QueryClient hides QueryCache) | ⬜ |
| Strategy Pattern (retry backoff) | 9 | `query/src/core` | ⬜ |
| Command-ish (actions as data) | 2 | `redux/src/core` | ⬜ |

## 4. System Design Concepts

| Concept | Week | Covered in | Status |
|---|---|---|---|
| Framework-agnostic core + thin framework bindings split | 1, 5, 7, 10 | both packages' `src/core` vs `src/react` | ⬜ |
| Public API design (what's exposed vs internal) | throughout | both | ⬜ |
| Extensibility via composition (middleware/enhancers/plugins) | 3, 4 | `redux/src/core` | ⬜ |
| Cache invalidation strategy | 11 | `query/src/core` | ⬜ |
| Optimistic update + rollback | 11 | `query/src/core` | ⬜ |
| Trade-off analysis vs real library (documented per package) | 12 | both READMEs, "Real vs Mine" | ⬜ |

---

## 📊 Summary

| Section | Total | Done |
|---|---|---|
| TypeScript Topics | 15 | 1 |
| JavaScript Runtime Concepts | 10 | 1 |
| Software Design Patterns | 7 | 0 (1 🟡) |
| System Design Concepts | 6 | 0 |
| **Total** | **38** | **2** (+1 in progress) |
