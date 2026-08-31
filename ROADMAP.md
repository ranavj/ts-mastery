# 🗺️ ts-mastery — Build Your Own Redux & TanStack Query

> **Kis ke liye:** Vijay. React/Angular mein comfortable, ab TypeScript ko **type-system level**
> pe samajhna hai, aur saath mein yeh bhi ki **real frameworks/libraries internally kaise design
> hoti hain** — system design, JS runtime concepts, software design patterns.
>
> **Poora React/Next.js/Angular clone karna scope se bahar hai** — isliye ek specific, high-leverage
> slice choose kiya: **state management**. Yeh isliye best slice hai kyunki:
> - Redux aur TanStack Query dono **real, famous, industry-standard** libraries hain — inka source
>   code publicly available hai, compare kar sakte ho apna implementation unse.
> - Dono **same core architecture pattern** use karte hain jo har major framework use karta hai:
>   **framework-agnostic core engine + thin framework-specific bindings** (jaise React khud
>   `react-dom`/`react-reconciler` split follow karta hai). Yeh pattern seekhna = system design
>   ka real lesson milta hai, sirf ek library tak limited nahi.
> - Dono mein advanced TypeScript **naturally** zaroori padta hai — generic inference across
>   poori store/cache, discriminated unions, conditional types, `infer`.
>
> **Rule:** Redux ya @tanstack/query-core ki library import nahi karni — apna banana hai. Par
> unka **actual GitHub source padhna hai** har module se pehle (real design dekhna, phir apna
> version banana) — yeh "copy karna" nahi, "reverse-engineer karke seekhna" hai.

---

## 🧭 Har module ka process (SPIKE-SOURCE → DESIGN → BUILD → TEST → DOCUMENT → SHIP)

1. **SPIKE-SOURCE** — us module ka **real Redux / real @tanstack/query-core source code** GitHub
   pe padho (chhota hi hota hai, core logic 100-300 lines jitna). Samjho **kyun** aisa design kiya.
2. **DESIGN (RFC-lite)** — package README mein us week ke "Design Questions" answer karo, apna
   architecture socho — real se same hona zaroori nahi, par informed decision hona chahiye.
3. **BUILD** — scratch se likho.
4. **TEST** — chhota test/demo jo real use-case dikhaye.
5. **DOCUMENT** — README mein API Surface + "Real vs Mine — kya farak hai aur kyun" section.
6. **SHIP** — [push checklist](#-push-checklist).

Nontrivial decision → [ADR](docs/adr/README.md) likho.

---

## 🟦 TRACK A — `packages/redux` — Build Your Own Redux (Weeks 1–6)

### Week 1 — Core Store Engine (`src/core`)
`createStore`, `dispatch`, `subscribe`, `getState`.
- **Pattern:** Observer Pattern (subscribe/notify)
- **JS:** Closures (private `state`/`listeners` variable, koi class nahi — Redux khud closures se bana hai)
- **TS:** Generics over `State`/`Action`, function overloads

### Week 2 — Reducer Composition (`combineReducers`)
Multiple chhote reducers ko ek root reducer mein jodna.
- **TS:** Mapped Types, `keyof`, cross-reducer generic inference (root state shape reducer-map se nikalna)
- **TS:** Discriminated Union Actions + exhaustiveness checking (`never` trick reducer ke `switch` mein)

### Week 3 — Middleware System (`applyMiddleware`, `compose`)
`logger`, `thunk` jaisa apna middleware banao.
- **Pattern:** Middleware / Chain-of-Responsibility Pattern
- **TS:** Higher-order generic functions, function composition types (`compose(f, g, h)` ka type)

### Week 4 — Store Enhancers + DevTools Bridge
`compose(enhancer1, enhancer2)(createStore)` — samjho enhancers `applyMiddleware` se upar kyun hote hain.
- **System Design:** Extensibility via composition (plugins ka pattern) — Redux DevTools isi hook pe kaam karta hai
- **TS:** Complex generic composition, variance

### Week 5 — React Bindings (`src/react`)
`Provider`, `useSelector`, `useDispatch`.
- **JS/React:** Context API, selector memoization (referential equality)
- **TS:** Generics across store↔React boundary, custom hook typing

### Week 6 — Toolkit-style Ergonomics (`createSlice` clone)
Immer-jaisa "mutate a draft, get immutable output" pattern (bonus: Proxy se khud banao).
- **JS:** Proxy (mutation ko intercept karke immutable copy banana — structural sharing)
- **TS:** Heavy `infer`/Mapped Types — slice definition se action-creators ke types **automatically** nikalna

**Track A Capstone:** apna Redux + apna React-bindings se ek chhota counter/todo state demo, DevTools bridge ke saath.

---

## 🟪 TRACK B — `packages/query` — Build Your Own TanStack Query (Weeks 7–12)

### Week 7 — QueryClient + QueryCache Core (`src/core`)
- **Pattern:** Singleton (QueryClient), Facade (QueryClient chhupata hai QueryCache ki complexity)
- **JS:** `Map`/`WeakMap`-based cache, query-key hashing (object → stable string key)
- **TS:** Generics over `TData`/`TError`

### Week 8 — QueryObserver (state machine)
Status: `idle | loading | success | error | stale`.
- **Pattern:** Observer Pattern (queries ko multiple components subscribe kar sakte hain)
- **TS:** Discriminated union for lifecycle state (narrowing se `data` sirf `success` mein accessible)
- **JS:** Microtask batching (multiple `setState` ek hi render mein batch karna)

### Week 9 — Request Lifecycle
Dedupe in-flight requests, retry with exponential backoff, `staleTime`/`gcTime`.
- **Pattern:** Strategy Pattern (retry strategy plug-in-able)
- **JS:** Timers (`setTimeout` for stale/gc), Promise deduplication (same key ke do calls → ek hi Promise share)

### Week 10 — React Bindings (`useQuery`, `useMutation`)
- **TS:** Conditional Types + `infer` — query-fn (`() => Promise<TData>`) se `TData` **automatically** nikalna, caller ko generic likhne ki zarurat na pade
- **React:** custom hook + subscription cleanup (`useEffect`)

### Week 11 — Advanced Features
Infinite queries (cursor pagination), optimistic updates, partial query-key invalidation.
- **TS:** Template Literal / structural key matching for invalidation (`['issues', id]` ka prefix-match `['issues']` se)
- **System Design:** Optimistic update rollback strategy (snapshot + restore on error)

### Week 12 — Integration + Capstone
- `apps/playground` — chhota React app jisme **dono** libraries saath chalti hain (`redux` = UI state jaise selected-filter, `query` = server data fetch/cache)
- **Final audit:** [`COVERAGE.md`](COVERAGE.md) sab ✅
- Har package README mein "Real vs Mine" section complete karo — real Redux/@tanstack/query-core se apna implementation compare karke likho kya same hai, kya simplify kiya, kyun

---

## 🔄 Push checklist

1. Module code — scratch se, working test/demo
2. Package `README.md` — Design Questions answered, API Surface, "Real vs Mine" notes
3. `docs/adr/` — non-trivial decision → ADR
4. `COVERAGE.md` — is week ke topics tick
5. `PROGRESS.md` — status update
6. Commit — `TS Wk<NN>: <feature>`
