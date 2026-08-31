# `packages/redux` — Build Your Own Redux (Weeks 1–6)

**Status:** 📋 Not Started

## Purpose

Real Redux ke internals reverse-engineer karke apna version banana — `src/core/` mein
framework-agnostic engine, `src/react/` mein React bindings. Goal: samjhna ki Redux **kyun** aise
design hui hai (not just "kaise use karte hain", jo aap already jaante ho).

**Har week shuru karne se pehle:** us feature ka real source [reduxjs/redux](https://github.com/reduxjs/redux/tree/master/src) mein padho — chhota hi hota hai.

---

## Week 1 — Core Store Engine

**Target API:**
```ts
const store = createStore(reducer, initialState)
store.dispatch({ type: 'increment' })
store.getState()
const unsubscribe = store.subscribe(() => console.log('changed'))
```

**Design Questions:**
- `createStore` ke andar state aur listeners kahan store honge — closure variable mein, ya class
  field mein? Real Redux closure use karta hai — kyun (encapsulation, no `this` binding issues)?
- `dispatch` ke baad **saare** subscribers ko synchronously notify karoge, ya batch karoge?
- `createStore<State, Action>` generic kaise likhoge taaki `reducer: (state, action) => state`
  ka type match ho aur `dispatch` sirf valid `Action` accept kare?

## Week 2 — `combineReducers`

**Target API:**
```ts
const rootReducer = combineReducers({ counter: counterReducer, user: userReducer })
// state shape automatically: { counter: CounterState, user: UserState }
```

**Design Questions:**
- Reducer-map object se root-state ka shape **automatically** kaise infer karoge (Mapped Type +
  `keyof` — har key ke reducer ka return-type hi us slice ka state-type hai)?
- Actions ka discriminated union kaisa banega (`{ type: 'counter/inc' } | { type: 'user/set', payload }`)?
  Reducer ke `switch(action.type)` mein ek case miss ho jaaye to compile-time error kaise aaye
  (`default: const _exhaustive: never = action` trick)?

## Week 3 — Middleware System

**Target API:**
```ts
const logger = (store) => (next) => (action) => { console.log(action); return next(action) }
const store = createStore(reducer, applyMiddleware(logger, thunk))
```

**Design Questions:**
- Middleware signature `(store) => (next) => (action) => result` — teen-level curried function
  ka type kaise likhoge saaf-saaf?
- `applyMiddleware(a, b, c)` ke andar `compose` function bina kisi library ke khud kaise likhoge?
  `compose(f, g, h)(x)` ka generic return-type kaise track hoga jab har function ka input/output
  alag ho sakta hai?

## Week 4 — Store Enhancers + DevTools Bridge

**Design Questions:**
- `applyMiddleware(...)` khud ek "enhancer" hai — `compose(enhancer1, enhancer2)(createStore)`
  pattern samjho: enhancer `createStore` ko **wrap** karta hai. Yeh design (enhancers ke andar
  middleware) kyun kiya gaya — extensibility ke liye kya fayda hai?
- Redux DevTools sirf `dispatch` aur `subscribe` ko intercept karke poora time-travel debugging
  kar leta hai — kaise? Apna chhota "action log" enhancer banao jo yeh dikhaye.

## Week 5 — React Bindings (`src/react`)

**Target API:**
```tsx
<Provider store={store}>
  <App />
</Provider>
const count = useSelector((state) => state.counter)
const dispatch = useDispatch()
```

**Design Questions:**
- `Provider` Context API se store ko tree mein pass karega — `useSelector` render ke baad kaise
  decide karega ki re-render zaroori hai ya nahi (referential equality check)?
- `useSelector<State, Result>(selectorFn: (state: State) => Result)` — `State` generic Context
  se kaise pick up hoga bina caller ko har baar likhne ke?

## Week 6 — `createSlice` (Toolkit-style, Proxy-based)

**Target API:**
```ts
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value++ },   // "mutate" karte dikhta hai, immutable output milta hai
  },
})
counterSlice.actions.increment()   // action-creator AUTO-GENERATED, type bhi
```

**Design Questions:**
- "Mutate karo, immutable milega" — yeh Immer ka core trick hai. Ek `Proxy` se draft object banao
  jo mutations record kare, phir un mutations ko replay karke naya immutable object banao —
  kaise design karoge?
- `reducers` object se `actions` (action creators) **automatically** kaise generate honge, poore
  types ke saath (`increment` ka payload-type reducer ke second param se `infer` hoga)?

---

## API Surface

_(design karne ke baad yahan fill karo, module-by-module)_

## Real vs Mine

_(Week 6 ke baad: real Redux/Redux-Toolkit source se apna implementation compare karke likho —
kya same hai, kya simplify kiya, kya missing hai aur kyun)_

## Notes / Gotchas

_(build karte waqt jo seekha, yahan)_
