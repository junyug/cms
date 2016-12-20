import * as types from '../../mutation-types'
import actions from './actions'
import getters from './getters'
export default {
  state: {
    moduleEmpty: {id: '-1', module: {template_code: 'template_empty'}},
    modules: [],
    applyModuleList: [],
    operateModule: {}
  },
  mutations: {
    [types.SET_MODULE_LIST] (state, payload) {
      state.modules = payload.list
    },
    [types.SET_APPLY_MODULE_LIST] (state, payload) {
      if (payload.list.length) {
        state.applyModuleList = payload.list
      } else {
        state.applyModuleList = []
        state.applyModuleList.push(state.moduleEmpty)
      }
    },
    [types.ADD_MODULE] (state, payload) {
      debugger
      if (state.applyModuleList.length === 1 && state.applyModuleList[0].id == -1) {
        state.pageModules.splice(0, 1)
        state.pageModules.push(payload.data)
      } else {
        state.applyModuleList.splice(payload.index + 1, 0, payload.data)
      }
    }
  },
  getters: getters,
  actions: actions
}

