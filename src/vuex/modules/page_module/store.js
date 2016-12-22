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
      if (state.applyModuleList.length === 1 && state.applyModuleList[0].id == -1) {
        state.applyModuleList.splice(0, 1)
        state.applyModuleList.push(payload.data)
      } else {
        state.applyModuleList.splice(payload.index + 1, 0, payload.data)
      }
    },
    [types.UPDATE_MODULE] (state, payload) {
      state.applyModuleList.forEach((module, index) => {
        if (module.id == payload.data.id) {
          state.applyModuleList.splice(index, 1, payload.data)
        }
      })
    },
    [types.DELETE_MODULE] (state, payload) {
      state.applyModuleList.forEach((module, index) => {
        if (module.id == payload.data.id) {
          state.applyModuleList.splice(index, 1)
          if (!state.applyModuleList.length) {
            state.applyModuleList.push(state.moduleEmpty)
          }
        }
      })
    },
    [types.SET_OPERATE_MODULE] (state, payload) {
      state.operateModule = payload.data
    }
  },
  getters: getters,
  actions: actions
}

