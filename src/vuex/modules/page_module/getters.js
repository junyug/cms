import * as types from '../../mutation-types'
export default {
  [types.MODULE_LIST] (state, getters, rootState) {
    return state.modules
  },
  [types.APPLY_MODULE_LIST] (state, getters, rootState) {
    return state.applyModuleList
  },
  [types.OPERATE_MODULE] (state, getters, rootState) {
    return state.operateModule
  }
}

