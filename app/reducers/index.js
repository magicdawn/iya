import { combineReducers } from 'redux'
import { format as fmt } from 'util'
import _ from 'lodash'
import * as actions from '../actions'

const todos = (state = [], action) => {
  const types = [
    actions.ADD_TODO,
    action.COMPLETE_TODO,
  ]
  if(!_.includes(types, action.type)) return state

  if(action.type === actions.ADD_TODO) {
    return [
      ...state,
      {
        text: action.text,
        completed: false,
      }
    ]
  }
}


export default combineReducers({
  todos
})