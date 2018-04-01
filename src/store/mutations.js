import * as types from './mutation-types'

export default {
  [types.SET_STATES] (state, states) {
    state.states = states || []
  },
  [types.SELECTED_STATE] (state, _state) {
    state.stateSelected = _state || {}
  }
}
