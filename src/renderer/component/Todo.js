import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TodoActions } from '../../shared/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Todo extends Component {
  constructor(props) {
    super(props)

    this.delete = this.delete.bind(this)
  }

  delete(e) {
    const classList = e.currentTarget
                       .parentNode
                       .parentNode
                       .classList

    classList.add('RemovePhase1')
    setTimeout(() => {
      classList.add('RemovePhase2')
      setTimeout(() => {
        classList.add('RemovePhase3')
        setTimeout(() => {
          this.props.delete(this.props.todo.id)
        }, 350)
      }, 100)
    }, 200)
  }

  render() {
    const { todo } = this.props

    return (
      <div className="Todo">
        <div className="Done">
          <div className="Button" onClick={this.delete}>
            <FontAwesomeIcon icon="check" />
          </div>
        </div>
        <div className="Info">
          <div className="Title">{todo.title}</div>
          <div className="Interval">
            <FontAwesomeIcon icon="clock" /> {todo.intervalValue} {todo.intervalUnit}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    delete: id => dispatch(TodoActions.delete(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)


