import * as types from '../../mutation-types'
export default {
  [types.MODULE_TIMELINE_LIST] (state, getters, rootState) {
    return state.list
  },
  [types.OPERATE_TIMELINE_ID] (state, getters, rootState) {
    return state.timelineId
  }
}

