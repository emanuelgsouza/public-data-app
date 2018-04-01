import { find } from 'lodash'
import * as types from './mutation-types'

export default {
  [types.SET_STATES] (state, states) {
    state.states = states || []
  },
  [types.SELECTED_STATE] (state, uf) {
    const states = state.states || []
    const _state = find(states, _state => _state.sigla === uf)
    state.stateSelected = _state || {}
  }
}
