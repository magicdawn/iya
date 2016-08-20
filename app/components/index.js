import React from 'react' // 必须使用 React
import request from 'superagent'
import { connect } from 'react-redux'
import { cloneDeep } from 'lodash'

const { Component } = React

class App extends Component {
  constructor() {
    super()
  }

  static defaultProps = {
    name: 'foo'
  }

  async pong() {
    return request.get('http://baidu.com')
  }

  async ping() {
    await this.pong()
  }

  render() {
    const { dispatch, show } = this.props

    return (
      <div style={{color: 'purple' }}>
        hello your name is : <br />
        {this.props.name}

        <br />
        state.show={ show }
        <button onClick={ e => this.handleToggle(e) }>
          toggle
        </button>
      </div>
    )
  }

  handleToggle(e){
    const { dispatch, show } = this.props
    console.log('dispatching')
    dispatch({
      type: 'TOGGLE_SHOW'
    })
  }
}

const mapStateToProps = state => {
  return cloneDeep(state)
}

export default connect(mapStateToProps)(App)