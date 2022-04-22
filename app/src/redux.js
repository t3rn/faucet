import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const DUMP = "DUMP"

export function dump(props) {
  return { type: DUMP, ...props }
}

export const store = createStore(
  function rootReducer(state = {}, { type, ...props }) {
    switch (type) {
      case DUMP:
        return { ...state, ...props }
      default:
        return state
    }
  },
  {
    /* dehydrated state */
  },
  composeEnhancers(applyMiddleware(thunk))
)
