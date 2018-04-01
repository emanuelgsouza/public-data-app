import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import mutations from './mutations'
import plugins from './plugins'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [ ...plugins ]
})

export default store
