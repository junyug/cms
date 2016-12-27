import * as types from '../../mutation-types'
import actions from './actions'
import getters from './getters'
export default {
  state: {
    list: []
  },
  mutations: {
    [types.SET_GOOD_LIST] (state, payload) {
      state.list = payload.list || []
    }
  },
  getters: getters,
  actions: actions
}

