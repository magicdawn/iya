import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import jQuery from 'jquery'
import superagent from 'superagent'

global.React = React
global.ReactDOM = ReactDOM
global.$ = global.jQuery = jQuery
global.superagent = superagent