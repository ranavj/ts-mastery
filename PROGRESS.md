# 📈 Progress Tracker — ts-mastery

> Har week ke baad yeh update hoga. Naya session shuru karte waqt **yeh sabse pehle padho**,
> phir [`ROADMAP.md`](ROADMAP.md), phir [`COVERAGE.md`](COVERAGE.md).

**Status:** 🟢 Week 2 (`combineReducers`) done — Week 3 (middleware) next.

---

## ✅ Completed

- **Setup** — monorepo scaffold, strict `tsconfig.base.json`, ADR practice, `COVERAGE.md` matrix
- **Pivot (2026-08-28)** — dropped TaskFlow app + generic packages (core-types, validator,
  query-builder, event-bus, api-client); repo ab sirf 2 flagship libraries pe focused hai,
  advanced/faithful-to-source level pe
- **Week 1 — Core store engine** ✅ — `packages/redux/src/core/createStore.ts`: closures-based
  `state`, `dispatch`, `getState`, `subscribe`; full generics (`<State, Action>`); real bug
  reproduce + fix karke `nextListeners` copy-on-write pattern (real Redux ka pattern) implement
  kiya — verified via actual bug-repro test (listener skip during mid-dispatch unsubscribe)

## 🟦 Track A — Build Your Own Redux

| Week | Module | Status | Notes |
|---|---|---|---|
| 1 | Core store engine | ✅ done | closures, generics, copy-on-write (`nextListeners`) fix verified |
| 2 | combineReducers | ✅ done | `keyof`, Mapped Types; hit + fixed a real TS limitation (union-key write → `never`) |
| 3 | Middleware system | ⬜ next | |
| 4 | Enhancers + DevTools bridge | ⬜ locked | |
| 5 | React bindings | ⬜ locked | |
| 6 | createSlice (Proxy-based) | ⬜ locked | |

## 🟪 Track B — Build Your Own TanStack Query

| Week | Module | Status | Notes |
|---|---|---|---|
| 7 | QueryClient + QueryCache | ⬜ locked | |
| 8 | QueryObserver (state machine) | ⬜ locked | |
| 9 | Request lifecycle (dedupe/retry/stale) | ⬜ locked | |
| 10 | React bindings (useQuery/useMutation) | ⬜ locked | |
| 11 | Advanced features (infinite/optimistic) | ⬜ locked | |
| 12 | Integration capstone + audit | ⬜ locked | |

---

## 🔄 Push checklist

1. Module code — scratch se, working test/demo
2. Package `README.md` — Design Questions, API Surface, "Real vs Mine"
3. `docs/adr/` — non-trivial decision → ADR
4. `COVERAGE.md` — is week ke topics tick
5. Yeh file — status update
6. Commit — `TS Wk<NN>: <feature>`
