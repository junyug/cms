import * as types from '../../mutation-types'
import actions from './actions'
import getters from './getters'
export default {
  state: {
    list: []
  },
  mutations: {
    [types.SET_DS_ITEM_LIST] (state, payload) {
      state.list = payload.list || []
    },
    [types.ADD_ITEM] (state, payload) {
      state.list.push(payload.data)
    },
    [types.UPDATE_ITEM] (state, payload) {
      state.list.forEach((timeline, index) => {
        if (timeline.id == payload.data.id) {
          state.list.splice(index, 1, payload.data)
        }
      })
    },
    [types.BATCH_UPDATE_ITEM] (state, payload) {
      state.list = payload.list || []
    },
    [types.DELETE_ITEM] (state, payload) {
      state.list.forEach((timeline, index) => {
        if (timeline.id == payload.data.id) {
          state.list.splice(index, 1)
        }
      })
    },
    [types.BATCH_DELETE_ITEM] (state, payload) {
      state.list = payload.list || []
    }
  },
  getters: getters,
  actions: actions
}

