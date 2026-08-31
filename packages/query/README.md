# `packages/query` — Build Your Own TanStack Query (Weeks 7–12)

**Status:** 📋 Not Started

## Purpose

Real TanStack Query ke internals reverse-engineer karke apna version banana — `src/core/` mein
framework-agnostic engine (jaisa `@tanstack/query-core` hai), `src/react/` mein React bindings.

**Har week shuru karne se pehle:** us feature ka real source [TanStack/query](https://github.com/TanStack/query/tree/main/packages/query-core/src) mein padho.

---

## Week 7 — QueryClient + QueryCache Core

**Target API:**
```ts
const client = new QueryClient()
client.getQueryData(['issue', '123'])
client.setQueryData(['issue', '123'], data)
```

**Design Questions:**
- `QueryClient` public API simple hai, par andar `QueryCache` complex hai — yeh **Facade
  pattern** hai. Kya-kya `QueryClient` expose karega, kya `QueryCache` ke andar hi rahega?
- Query-key ek array hai (`['issue', '123']`) — cache mein isse ek **stable string key** mein
  kaise convert karoge (order-sensitive hashing)? `Map` use karoge ya plain object?
- `QueryClient` ek app mein ek hi hona chahiye (Singleton-ish) — kaise enforce/design karoge
  (ya enforce nahi karoge, bas convention rakhoge)?

## Week 8 — QueryObserver (State Machine)

**Target API:**
```ts
const observer = new QueryObserver(client, { queryKey: ['issue', '123'], queryFn })
observer.subscribe((result) => { /* result.status: idle|loading|success|error|stale */ })
```

**Design Questions:**
- Status ek discriminated union hoga — `{ status: 'success', data: T } | { status: 'error', error: E } | ...`.
  Har status transition (loading→success, loading→error) kahan trigger hogi?
- Ek hi query ko multiple components subscribe kar sakte hain — sab ko ek saath notify karna hai.
  Yeh **Observer pattern** hai — listeners kaise store/notify karoge (Week 1 ke Redux subscribe
  se kya similar hai, kya alag)?
- Multiple state-updates ek saath aayein to render batch kaise karoge (microtask queue use karke)?

## Week 9 — Request Lifecycle

**Design Questions:**
- Do components same query-key ke saath same time pe fetch trigger karein — ek hi network call
  jaani chahiye (**deduplication**). In-flight Promise ko kahan store/share karoge?
- Retry logic — fail hone par turant retry na karke **exponential backoff** (1s, 2s, 4s...) se
  retry karo. Yeh **Strategy pattern** hai — retry-strategy ko pluggable kaise banaoge?
- `staleTime` (kab tak data "fresh" mana jaaye) aur `gcTime` (kab tak unused cache entry rakhein)
  — dono `setTimeout` se kaise manage honge, aur query dobara use hone par timer kaise reset ho?

## Week 10 — React Bindings

**Target API:**
```ts
const { status, data, error } = useQuery({ queryKey: ['issue', id], queryFn: () => api.getIssue(id) })
```

**Design Questions:**
- `queryFn: () => Promise<TData>` diya — `useQuery` ka return-type `TData` **automatically**
  kaise nikalega bina caller ko `useQuery<Issue>(...)` likhwaye? (`infer` on the function type)
- Component unmount hone par subscription cleanup (`useEffect` return) kaise hoga, taaki memory
  leak na ho?

## Week 11 — Advanced Features

**Design Questions:**
- Infinite scroll ke liye `useInfiniteQuery` — cursor-based pagination ka type kaisa hoga
  (`getNextPageParam` se agla cursor nikalna)?
- Optimistic update: mutation se pehle UI turant update karo, fail ho to **rollback**. Rollback ke
  liye "pehle wala snapshot" kahan save karoge?
- `invalidateQueries(['issue'])` call karne par sirf `['issue']` se shuru hone waali saari keys
  (`['issue', '1']`, `['issue', '2']`) invalidate honi chahiye — yeh **prefix matching** kaise
  design karoge?

## Week 12 — Integration Capstone

- `apps/playground` — dono libraries (`redux` + `query`) ek chhoti React app mein saath: `query`
  se data fetch/cache, `redux` se UI state (selected item, filter)
- [`COVERAGE.md`](../../COVERAGE.md) final audit — sab ✅
- "Real vs Mine" section (neeche) complete karo dono packages ke liye

---

## API Surface

_(design karne ke baad yahan fill karo, module-by-module)_

## Real vs Mine

_(Week 12 ke baad: real @tanstack/query-core se apna implementation compare karke likho — kya
same hai, kya simplify kiya, kya missing hai aur kyun)_

## Notes / Gotchas

_(build karte waqt jo seekha, yahan)_
