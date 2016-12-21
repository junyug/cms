import * as types from '../../mutation-types'
import actions from './actions'
import getters from './getters'
export default {
  state: {
    list: []
  },
  mutations: {
    [types.SET_MODULE_TIMELINE_LIST] (state, payload) {
      state.list = payload.list
    },
    [types.ADD_TIMELINE] (state, payload) {
      state.list.push(payload.data)
    },
    [types.UPDATE_TIMELINE] (state, payload) {
      state.list.forEach((timeline, index) => {
        if (timeline.id == payload.data.id) {
          state.list.splice(index, 1, payload.data)
        }
      })
    }
  },
  getters: getters,
  actions: actions
}

