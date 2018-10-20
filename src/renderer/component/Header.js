import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ApplicationActions } from '../../shared/action'

class Header extends Component {
  constructor(props) {
    super(props)

    this.toggleForm = this.toggleForm.bind(this)
    this.toggleSnooze = this.toggleSnooze.bind(this)
  }

  toggleForm() {
    this.props.toggleForm()
  }

  toggleSnooze() {
    this.props.toggleSnooze()
  }

  render() {
    const { application } = this.props

    return (
      <div className="Header">
        <div className="Title">Snoozy</div>
        <div className="Actions">
          <div className={`Action ToggleForm ${application.isFormOpen ? 'Active' : ''}`}
               onClick={this.toggleForm}>
            {
              application.isFormOpen ?
              <FontAwesomeIcon icon="times" /> :
              <FontAwesomeIcon icon="plus" />
            }
            <FontAwesomeIcon icon="plus" />
          </div>
          <div className={`Action ToggleSnooze ${application.isSnoozeOn ? 'Active' : ''}`}
               onClick={this.toggleSnooze}>
            {
              application.isSnoozeOn ?
              <FontAwesomeIcon icon="bell" /> :
              <FontAwesomeIcon icon="bell-slash" />
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { application } = state

  return {
    application
  }
}

const mapDispatchToProps = dispatch => {
  const { toggleForm, toggleSnooze } = ApplicationActions

  return {
    toggleForm: () => dispatch(toggleForm()),
    toggleSnooze: () => dispatch(toggleSnooze())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
