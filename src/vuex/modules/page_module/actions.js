import * as types from '../../mutation-types'
import {pageModuleApi} from '../../../api/index'
export default {
  [types.SET_MODULE_LIST] ({commit}, payload) {
    pageModuleApi.list(payload.data, (res) => {
      commit(types.SET_MODULE_LIST, {list: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.SET_APPLY_MODULE_LIST] ({commit}, payload) {
    pageModuleApi.getByPageId(payload.data, (res) => {
      commit(types.SET_APPLY_MODULE_LIST, {list: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.SORT_MODULES] ({commit}, payload) {
    pageModuleApi.sort(payload.data, (res) => {
      // commit(types.SET_APPLY_MODULE_LIST, {list: res})
      if (payload.callback) payload.callback(res)
    })
  }
}

