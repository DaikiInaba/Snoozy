import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TodoActions } from '../../shared/action'

class Form extends Component {
  constructor(props) {
    super(props)

    this.save = this.save.bind(this)
  }

  save(e) {
    e.preventDefault()

    const data = new FormData(e.target)
    const title = data.get('title')
    const intervalValue = data.get('intervalValue')
    const intervalUnit = data.get('intervalUnit')
    this.props.save({
      title,
      intervalValue: intervalValue || 5,
      intervalUnit: intervalUnit || 'minutes'
    })

    e.target.reset()
  }

  render() {
    const { application, todo } = this.props

    return (
      <div className={`Form ${application.isFormOpen ? 'Active' : ''}`}>
        <form onSubmit={this.save}>
          <input type="text" name="title" className="Title" />
          <div className="Interval">
            Snooze it by each
            <input type="text" name="intervalValue" placeholder="5" className="Value" />
            <input type="text" name="intervalUnit" placeholder="minutes" className="Unit" />
          </div>
          <input type="submit" value="Snooze" className="Save" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { application, todo} = state
  return {
    application,
    todo,
  }
}

const mapDispatchToProps = dispatch => {
  const { save  } = TodoActions

  return {
    save: todo => dispatch(save(todo))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
