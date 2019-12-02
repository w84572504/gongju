import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex)

const state = {
  user: {},
  sign: null,
  LOADING: false
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules
})
