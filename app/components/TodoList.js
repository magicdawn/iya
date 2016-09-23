import React from 'react'

export default class TodoList extends React.Component {
  constructor(){
    super()
  }

  render(){
    return (
      <ul>
        {this.props.todos.map((todo, index) => {
          return (
            <li key={index} >
              {todo.text}
            </li>
          )
        })}
      </ul>
    )
  }
}