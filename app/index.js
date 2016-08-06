/* global TWO, SOME_BOOLEAN */

import './demo/index'

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV !== 'production') {
  console.log('not in production')
}