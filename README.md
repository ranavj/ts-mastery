# ts-mastery

**Build Your Own Redux, aur Build Your Own TanStack Query** — advanced TypeScript, JS runtime
internals, aur system design ek saath seekhne ka 12-week project.

## Kyun yeh scope

Poora React/Next.js/Angular clone karna practical nahi hai — lekin **state management** ek aisa
slice hai jo:
- Real, famous, industry-standard hai (Redux, TanStack Query — dono ka source publicly hai)
- Har major framework jo core-architecture pattern use karta hai wahi use karta hai:
  **framework-agnostic core + thin framework bindings**
- Advanced TypeScript ko **naturally** zaroori bana deta hai — generics, `infer`, conditional
  types, discriminated unions, poori store/cache ke across type inference

Rule: library import nahi karni, apna banana hai — par har module se pehle **real source code
padhna hai** (reverse-engineer karke seekhna, blind copy nahi).

## Padhne ka order (naya session ho to)

1. [`PROGRESS.md`](PROGRESS.md) — abhi kahan hain
2. [`ROADMAP.md`](ROADMAP.md) — poora 12-week plan, week-by-week
3. [`COVERAGE.md`](COVERAGE.md) — TS + JS + Design Patterns + System Design ka audit checklist
4. [`docs/adr/`](docs/adr/README.md) — design decisions ka log

## Layout

```
packages/
  redux/            Build Your Own Redux (Weeks 1-6)
    src/core/         framework-agnostic engine (createStore, combineReducers, middleware, enhancers)
    src/react/        React bindings (Provider, useSelector, useDispatch)
  query/            Build Your Own TanStack Query (Weeks 7-12)
    src/core/         framework-agnostic engine (QueryClient, QueryCache, QueryObserver)
    src/react/        React bindings (useQuery, useMutation)
apps/
  playground/       Week 12 capstone — dono libraries ek chhoti React app mein saath
docs/adr/           Architecture Decision Records
```

npm workspaces monorepo (`npm install` root se).

## Process

Har module: **SPIKE-SOURCE** (real Redux/@tanstack/query-core source padho) → **DESIGN**
(package README mein Design Questions answer karo) → **BUILD** (scratch se) → **TEST** →
**DOCUMENT** (API Surface + "Real vs Mine"). Detail: [`ROADMAP.md`](ROADMAP.md).

**Note:** Code khud likhna hai — yeh scaffold/roadmap/spec-stubs hain.
