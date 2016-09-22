import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { browserHistory } from 'react-router'
import reducers from './reducers'
import App from './components'

const prod = process.env.NODE_ENV === 'production'

console.log(process.env.NODE_ENV)
const store = createStore(
  reducers,
  prod ? undefined : window.devToolsExtension && window.devToolsExtension()
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)