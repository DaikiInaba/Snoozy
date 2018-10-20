import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../component/Header'
import Todos from '../component/Todos'
import Form from '../component/Form'

export default class Snoozy extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Container">
        <Header />
        <Todos />
        <Form />
      </div>
    )
  }
}
