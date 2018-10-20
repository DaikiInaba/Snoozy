import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Todo from './Todo'

class Todos extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { todos } = this.props

    return (
      <div className="Todos">
        {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { todos } = state
  return {
    todos
  }
}

export default connect(
  mapStateToProps,
)(Todos)
