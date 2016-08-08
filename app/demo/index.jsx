import React from 'react' // 必须使用 React
import request from 'superagent'

const { Component } = React

export default class X extends Component {
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
    return (
      <div style={{color: 'purple' }}>
        hello your name is : <br />
        {this.props.name}
      </div>
    )
  }
}