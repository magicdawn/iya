import React from 'react'
import $ from 'jquery'

export default class AddTodo extends React.Component {
  constructor() {
    super()
  }

  handleAddTodo(e){
    const val = $(this.refs.input).val()
    if(!val) return alert('no input')

    this.props.handleAddTodo(val)
  }

  render(){
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={this.handleAddTodo.bind(this)}>
          Add
        </button>
      </div>
    )
  }
}