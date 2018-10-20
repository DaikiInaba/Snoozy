const defineActionTypes = (names) => {
  return names.reduce((result, name) => {
    result[name] = name
    return result
  }, {})
}

export const ApplicationTypes = defineActionTypes([
  'INIT',
  'INIT_SUCCESS',
  'TOGGLE_FORM',
  'TOGGLE_SNOOZE',
  'TOGGLE_SNOOZE_SUCCESS'
])

export const TodoTypes = defineActionTypes([
  'SAVE',
  'SAVE_SUCCESS',
  'DELETE',
  'DELETE_SUCCESS'
])
