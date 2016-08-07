import X from './demo/index'
import { render } from 'react-dom'
import React from 'react'

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV !== 'production') {
  console.log('not in production')
}

render(
  <X name='hello bojack & todd' />,
  document.getElementById('main')
)

console.log(1+1+1+1)