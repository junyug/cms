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
      if (payload.callback) payload.callback(res)
    })
  },
  [types.ADD_MODULE] ({commit}, payload) {
    pageModuleApi.add(payload.data, (res) => {
      commit(types.ADD_MODULE, {data: res, index: payload.data.module_index})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.UPDATE_MODULE] ({commit}, payload) {
    pageModuleApi.update(payload.data, (res) => {
      commit(types.UPDATE_MODULE, {data: res})
      commit(types.SET_OPERATE_MODULE, {data: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.DELETE_MODULE] ({commit}, payload) {
    pageModuleApi.delete(payload.data, (res) => {
      commit(types.DELETE_MODULE, {data: res})
      commit(types.SET_OPERATE_MODULE, {data: {}})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.SET_OPERATE_MODULE] ({commit}, payload) {
    pageModuleApi.getById(payload.data, (res) => {
      commit(types.SET_OPERATE_MODULE, {data: res})
      if (payload.callback) payload.callback(res)
    })
  }

}

