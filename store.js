import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import rootReducer from './src/Redux-api/reducers';

 const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store;

