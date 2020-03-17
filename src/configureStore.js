import { createStore, combineReducers } from 'redux';
import { messages } from './reducers'

export default () => {
  const rootReducer = combineReducers({
    messages
  })

  return createStore(rootReducer)
}