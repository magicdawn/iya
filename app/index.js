import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { browserHistory } from 'react-router'
import actions from './actions'
import App from './components'

console.log(process.env.NODE_ENV)

const store = createStore(actions)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)