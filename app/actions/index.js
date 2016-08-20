import {
  combineReducers
} from 'redux'

const TOGGLE_SHOW = 'TOGGLE_SHOW'

const show = (state = 'show', action) => {
  if(action.type !== TOGGLE_SHOW) return state

  console.log('old = %s', state)
  if(state === 'show') return 'hide'
  else return 'show'
}

export default combineReducers({
  show
})