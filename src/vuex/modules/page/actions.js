import * as types from '../../mutation-types'
import {pageApi} from '../../../api/index'
export default {
  [types.SET_PAGE_LIST] ({commit}, payload) {
    pageApi.list(payload.data, (res) => {
      commit(types.SET_PAGE_LIST, {list: res.rows})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.ADD_PAGE] ({commit}, payload) {
    pageApi.add(payload.data, (res) => {
      commit(types.ADD_PAGE, {data: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.UPDATE_PAGE] ({commit}, payload) {
    pageApi.update(payload.data, (res) => {
      commit(types.UPDATE_PAGE, {data: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.CLONE_PAGE] ({commit}, payload) {
    pageApi.clone(payload.data, (res) => {
      if (payload.callback) payload.callback(res)
    })
  },
  [types.SET_CITY_LIST] ({commit}, payload) {
    pageApi.cityList(payload.data, (res) => {
      commit(types.SET_CITY_LIST, {list: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.SET_TYPE_LIST] ({commit}, payload) {
    pageApi.typeList(payload.data, (res) => {
      commit(types.SET_TYPE_LIST, {list: res})
      if (payload.callback) payload.callback(res)
    })
  }

}

