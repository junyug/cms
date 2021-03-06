import * as types from '../../mutation-types'
import actions from './actions'
import getters from './getters'
export default {
  state: {
    list: [],
    timelineId: 0
  },
  mutations: {
    [types.SET_MODULE_TIMELINE_LIST] (state, payload) {
      state.list = payload.list
    },
    [types.SET_OPERATE_TIMELINE_ID] (state, payload) {
      state.timelineId = payload.data.id
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
    },
    [types.DELETE_TIMELINE] (state, payload) {
      state.list.forEach((timeline, index) => {
        if (timeline.id == payload.data.id) {
          state.list.splice(index, 1)
        }
      })
    }
  },
  getters: getters,
  actions: actions
}

