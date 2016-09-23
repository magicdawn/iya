/**
 * action type
 */

export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'

/**
 * action creators
 */

export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text,
  }
}