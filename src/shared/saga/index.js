import { all, select, call, put, takeLatest } from 'redux-saga/effects'
import Datastore from 'nedb'
import { ApplicationTypes, TodoTypes } from '../action/type'
import { ApplicationActions, TodoActions } from '../action'

const applicationStore = new Datastore({ filename: `${__dirname}/../../data/Application.store` })
applicationStore.loadDatabase()

const todoStore = new Datastore({ filename: `${__dirname}/../../data/Todo.store` })
todoStore.loadDatabase()

function* initApplication() {
  const application = yield call(() => {
    return new Promise((resolve, reject) => {
      applicationStore.findOne({}, (_, _application) => {
        resolve(_application, {})
      })
    })
  })

  const todos = yield call(() => {
    return new Promise((resolve, reject) => {
      todoStore.find({}, (_, _todos) => {
        resolve(_todos || [])
      })
    })
  })

  yield put(ApplicationActions.initSuccess({
    application,
    todos
  }))
}

function* toggleSnooze(action) {
  const isSnoozeOn = yield select(state => state.application.isSnoozeOn)

  yield call(() => {
    return new Promise((resolve, reject) => {
      applicationStore.update({}, { $set: { isSnoozeOn: !isSnoozeOn } }, { upsert: true }, (_, __) => {
        if (_) {
          reject()
        } else {
          resolve()
        }
      })
    })
  })

  yield put(ApplicationActions.toggleSnoozeSuccess())
}

function* saveTodo(action) {
  const id = yield select(state => state.todos.length + 1)

  const todo = Object.assign({}, action.payload.todo, { id })
  yield call(() => {
    return new Promise((resolve, reject) => {
      todoStore.insert(todo, (_, __) => {
        if (_) {
          reject()
        } else {
          resolve()
        }
      })
    })
  })

  yield put(TodoActions.saveSuccess(todo))
}

function* deleteTodo(action) {
  const id = action.payload.id

  yield call(() => {
    return new Promise((resolve, reject) => {
      todoStore.remove({ id: id }, {}, (_, __) => {
        if (_) {
          reject()
        } else {
          resolve()
        }
      })
    })
  })

  yield put(TodoActions.deleteSuccess(id))
}

export default function* () {
  yield all([
    yield takeLatest(ApplicationTypes.INIT, initApplication),
    yield takeLatest(ApplicationTypes.TOGGLE_SNOOZE, toggleSnooze),
    yield takeLatest(TodoTypes.SAVE, saveTodo),
    yield takeLatest(TodoTypes.DELETE, deleteTodo)
  ])
}
