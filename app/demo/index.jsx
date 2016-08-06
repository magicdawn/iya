import { Component } from 'react'
import request from 'superagent'

export class X extends Component {
  constructor() {
    super()
  }

  getDefaultProps() {
    return {
      name: ''
    }
  }

  async pong() {
    return request.get('http://baidu.com')
  }

  async ping() {
    await this.pong()
  }

  render() {
    return (
      <div>{ this.props.name }</div>
    )
  }
}