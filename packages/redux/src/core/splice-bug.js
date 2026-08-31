function createStore(reducer, initialState) {
  let state = initialState
  let listeners = []

  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  function getState() {
    console.log('listeners inside getState:', listeners)
    return state
  }
  function subscribe(listener) {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) listeners.splice(index, 1)   // <- ARRAY ko IN-PLACE mutate kar raha hai
    }
  }
  return { dispatch, getState, subscribe }
}

const reducer = (state = 0, action) => (action.type === 'inc' ? state + 1 : state)
const store = createStore(reducer, 0)

let unsubA
function listenerA() {
  console.log('listenerA called -> ab khud ko unsubscribe kar raha hai')
  unsubA()
}
function listenerB() {
  console.log('listenerB called')
}
function listenerC() {
  console.log('listenerC called')
}

// order: A (index 0), B (index 1), C (index 2)
unsubA = store.subscribe(listenerA)
store.subscribe(listenerB)
store.subscribe(listenerC)
console.log('--- dispatch ---')
store.dispatch({ type: 'inc' })
console.log('--- dispatch khatam ---')
console.log('Sawaal: upar A, B, C teeno call hue kya? Ginke dekho.')
