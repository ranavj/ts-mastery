type Reducer<State, Action> = (state: State | undefined, action: Action) => State;

type AppState = {
  counter: number;
  theme: 'light' | 'dark';
};

type AppAction = { type: 'counter/increment' } | { type: 'theme/toggle' };

function combineReducers(
  reducers: { counter: Reducer<number, AppAction>; theme: Reducer<'light' | 'dark', AppAction> }
): Reducer<AppState, AppAction> {
  const reducerKeys = Object.keys(reducers) as (keyof AppState)[]
  // ^ 'as' se TypeScript ko bataya: "trust me, yeh sirf 'counter'|'theme' hi honge"

  return function combination(state = {} as AppState, action) {
    const nextState = {} as AppState

    for (const key of reducerKeys) {
      // TODO 1: is 'key' ke liye reducer nikalo 'reducers' se
      // TODO 2: use call karo — state[key] aur action dekar
      // TODO 3: nextState[key] mein result rakho
      let reducer = reducers[key] as any;
      (nextState as any)[key] = reducer((state as any)[key] as any, action)
    }

    return nextState
  }
}

export default combineReducers

// --- quick manual test ---
function counterReducer(state: number = 0, action: AppAction): number {
  if (action.type === 'counter/increment') return state + 1
  return state
}
function themeReducer(state: 'light' | 'dark' = 'light', action: AppAction): 'light' | 'dark' {
  if (action.type === 'theme/toggle') return state === 'light' ? 'dark' : 'light'
  return state
}

const rootReducer = combineReducers({ counter: counterReducer, theme: themeReducer })

console.log(rootReducer(undefined, { type: 'counter/increment' } as any))
console.log(rootReducer({ counter: 0, theme: 'light' }, { type: 'counter/increment' }))
console.log(rootReducer({ counter: 1, theme: 'light' }, { type: 'theme/toggle' }))