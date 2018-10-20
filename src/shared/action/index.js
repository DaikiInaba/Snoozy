import {
  ApplicationTypes,
  TodoTypes
} from './type'

const localAction = action => {
  return Object.assign({}, action, {
    meta: {
      scope: 'local'
    }
  })
}

export const ApplicationActions = {
  init: () => {
    return {
      type: ApplicationTypes.INIT
    }
  },
  initSuccess: state => {
    return {
      type: ApplicationTypes.INIT_SUCCESS,
      payload: {
        state
      }
    }
  },
  toggleForm: () => {
    return {
      type: ApplicationTypes.TOGGLE_FORM
    }
  },
  toggleSnooze: () => {
    return localAction({
      type: ApplicationTypes.TOGGLE_SNOOZE
    })
  },
  toggleSnoozeSuccess: () => {
    return localAction({
      type: ApplicationTypes.TOGGLE_SNOOZE_SUCCESS
    })
  }
}

export const TodoActions = {
  save: todo => {
    return localAction({
      type: TodoTypes.SAVE,
      payload: {
        todo
      }
    })
  },
  saveSuccess: todo => {
    return localAction({
      type: TodoTypes.SAVE_SUCCESS,
      payload: {
        todo
      }
    })
  },
  delete: id => {
    return localAction({
      type: TodoTypes.DELETE,
      payload: {
        id
      }
    })
  },
  deleteSuccess: id => {
    return localAction({
      type: TodoTypes.DELETE_SUCCESS,
      payload: {
        id
      }
    })
  }
}
