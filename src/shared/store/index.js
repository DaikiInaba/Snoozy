import { createStore, applyMiddleware, compose } from 'redux'
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer
} from 'electron-redux'
import createSagaMiddleware from 'redux-saga'
import { ApplicationActions } from '../action'
import RootReducer from '../reducer'
import RootSaga from '../saga'

export default (initialState, scope) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = scope === 'main' ?
                      [triggerAlias, forwardToRenderer, sagaMiddleware] :
                      [forwardToMain, sagaMiddleware]
  const store = createStore(RootReducer, initialState,
                            compose(applyMiddleware(...middlewares)))
  sagaMiddleware.run(RootSaga)


  if (scope === 'main') {
    replayActionMain(store)
    store.dispatch(ApplicationActions.init())
  } else {
    replayActionRenderer(store)
  }

  return store
}
