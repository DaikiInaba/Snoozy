import { remote } from 'electron'
import React from 'react'
import { render } from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell, faBellSlash, faPlus, faTimes, faCheck, faClock
} from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux'
import { getInitialStateRenderer } from 'electron-redux'
import configureStore from '../shared/store'
import Container from './container'

library.add(faBell, faBellSlash, faPlus, faTimes, faCheck, faClock)

const initialState = getInitialStateRenderer()
const store = configureStore(initialState, 'renderer')

render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('Snoozy')
)
