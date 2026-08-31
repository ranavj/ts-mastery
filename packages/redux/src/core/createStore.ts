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
type CounterAction = { type: 'increment' }

const reducer: Reducer<number, CounterAction> = (state = 0, action) => {
  if (action.type === 'increment') return state + 1
  return state
}

const store = createStore(reducer, 0)
console.log(store.getState())
store.dispatch({ type: 'increment' })
console.log(store.getState())