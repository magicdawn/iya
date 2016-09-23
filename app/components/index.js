/**
 * Module dependencies
 */

import React from 'react' // 必须使用 React
import request from 'superagent'
import { connect } from 'react-redux'
import _ from 'lodash'
import { cloneDeep } from 'lodash'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

/**
 * components
 */

import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

class App extends React.Component {
  constructor() {
    super()
  }

  static defaultProps = {
    name: 'foo'
  }

  render() {
    console.log(this.props)
    return (
      <div style={{color: 'purple' }}>
        <AddTodo handleAddTodo={ this.props.addTodo } />
        <TodoList todos={ this.props.todos } />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return cloneDeep(state)
}

const mapDispatchToProps = dispatch => {
  const ret = bindActionCreators({
    addTodo: actions.addTodo,
  }, dispatch)

  ret.dispatch = dispatch

  return ret
}

export default connect(mapStateToProps, mapDispatchToProps)(App)