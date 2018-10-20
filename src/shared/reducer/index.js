import { combineReducers } from 'redux'
import {
  ApplicationTypes,
  TodoTypes
} from '../action/type'

const Application = () => ({
  isFormOpen: false,
  isSnoozeOn: true
})

const ApplicationReducer = (state = Application(), action) => {
  const payload = action.payload
  switch (action.type) {
    case ApplicationTypes.INIT_SUCCESS:
      return Object.assign({}, state, payload.state.application)
    case ApplicationTypes.TOGGLE_FORM:
      return Object.assign({}, state, {
        isFormOpen: !state.isFormOpen
      })
    case ApplicationTypes.TOGGLE_SNOOZE_SUCCESS:
      return Object.assign({}, state, {
        isSnoozeOn: !state.isSnoozeOn
      })
    case TodoTypes.SAVE:
      return Object.assign({}, state, {
        isFormOpen: false
      })
    default:
      return state
  }
}

const Todo = () => ({
  id: 0,
  title: '',
  intervalValue: 5,
  intervalUnit: 'minutes'
})

const TodoReducer = (state = Todo(), action) => {
  const payload = action.payload
  switch (action.type) {
    case TodoTypes.SAVE_SUCCESS:
      return Todo()
    default:
      return state
  }
}

const TodosReducer = (state = [], action) => {
  const payload = action.payload
  switch (action.type) {
    case ApplicationTypes.INIT_SUCCESS:
      return payload.state.todos
    case TodoTypes.SAVE_SUCCESS:
      return [...state, payload.todo]
    case TodoTypes.DELETE_SUCCESS:
      return state.filter(todo => todo.id != payload.id)
    default:
      return state
  }
}

const RootReducer = combineReducers({
  application: ApplicationReducer,
  todo: TodoReducer,
  todos: TodosReducer
})

export default RootReducer
