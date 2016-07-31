/* global TWO, SOME_BOOLEAN */
import './demo/index'
console.log('hello')

if(process.env.NODE_ENV !== 'production') {
  console.log('not in production')
}
console.log(process.env.NODE_ENV)

// TWO
console.log(TWO)

if(SOME_BOOLEAN) {
  console.log(SOME_BOOLEAN)
}

if(process.env.NODE_ENV !== 'production') {
  alert('hello world');
}