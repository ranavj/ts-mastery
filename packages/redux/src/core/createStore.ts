// TODO 1: 'Listener' naam ka type banao — ek function jo kuch nahi leta, kuch return nahi karta (void)
type Listener = () => void

// TODO 2: 'Reducer<State, Action>' naam ka generic type banao — function jo (state: State, action: Action) leke State return kare
type Reducer<State, Action> = (state: State, action: Action) => State

function createStore<State, Action>(
  reducer: Reducer<State, Action>,
  initialState: State
) {
  let state: State = initialState
  let listeners: Listener[] = []
  let nextListeners: Listener[] = listeners   // shuru mein dono SAME array

  function ensureCanMutateNextListeners() {
    // TODO 1: agar 'nextListeners' aur 'listeners' SAME array hain (===),
    //         to nextListeners ko listeners ka ek COPY bana do (.slice() se)
    if (nextListeners === listeners) {
      nextListeners = listeners.slice()
    }
  }

  function dispatch(action: Action) {
    state = reducer(state, action)

    // TODO 2: dispatch ko HAMESHA sabse latest subscribers use karne hain —
    //         'listeners' ko 'nextListeners' ke barabar kar do (sync)
    listeners = nextListeners
    listeners.forEach(listener => listener())
  }

  function getState(): State {
    return state
  }

  function subscribe(listener: Listener) {
    // TODO 3: mutate karne se PEHLE ensureCanMutateNextListeners() call karo
    ensureCanMutateNextListeners()
    nextListeners.push(listener)   // <- ab 'listeners' ki jagah 'nextListeners' use ho raha hai

    return () => {
      // TODO 4: yahan bhi ensureCanMutateNextListeners() call karo
      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      if (index > -1) nextListeners.splice(index, 1)
    }
  }

  return { dispatch, getState, subscribe }
}

export default createStore

// --- quick manual test ---

// --- actions (discriminated union) ---
type CounterAction = { type: 'counter/increment' }
type ThemeAction = { type: 'theme/toggle' }
type AppAction = CounterAction | ThemeAction

// --- counter slice ---
const counterReducer: Reducer<number, AppAction> = (state = 0, action) => {
  // TODO 1: agar action.type === 'counter/increment' hai, state+1 return karo
  // TODO 2: WARNA (yeh 'meri slip nahi hai' wala case), state jaisa hai waisa hi return karo
  switch (action.type) {
    case 'counter/increment':
      return state + 1
    default:
      return state
  } 
}

// --- theme slice ---
const themeReducer: Reducer<'light' | 'dark', AppAction> = (state = 'light', action) => {
  // TODO 3: agar action.type === 'theme/toggle' hai — state 'light' hai to 'dark' karo, 'dark' hai to 'light'
  // TODO 4: WARNA, state jaisa hai waisa hi return karo
    switch (action.type) {
      case 'theme/toggle':
        return state === 'light' ? 'dark' : 'light'
      default:
        return state
    }
}