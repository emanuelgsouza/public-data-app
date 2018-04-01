import { path } from 'ramda'
import * as types from './mutation-types'
import { ibgeApi } from '../support/http'

export const getStates = ({ commit }, states) => {
  return ibgeApi
    .get('/v1/localidades/estados')
    .then(path(['data']))
    .then(result => {
      commit(types.SET_STATES, result)
    })
}
