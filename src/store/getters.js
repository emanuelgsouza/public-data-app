import { isEmpty, toNumber } from 'lodash'

/**
 * @method hasStateSelected
 * @param  {StoreState}  state
 * @return {Boolean}
 */
export const hasStateSelected = state => !isEmpty(state.stateSelected)

/**
 * return a list of options with value is state id
 * @method statesOptions
 * @param  {StoreState} state
 * @return {Array<Object>}
 */
export const statesOptions = state => {
  return state.states.map(_state => {
    return {
      value: toNumber(_state.id),
      label: _state.nome
    }
  })
}

/**
 * return a list of options with value is state sigla
 * @method statesOptions
 * @param  {StoreState} state
 * @return {Array<Object>}
 */
export const statesSiglaOptions = state => {
  return state.states.map(_state => {
    return {
      value: _state.sigla,
      label: _state.nome
    }
  })
}
