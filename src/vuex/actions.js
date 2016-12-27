import * as types from './mutation-types'
import {goodsApi} from '../api/index'
export default {
  [types.SET_SALE_AREA_LIST] ({commit}, payload) {
    goodsApi.saleAreaList(payload.data, (res) => {
      commit(types.SET_SALE_AREA_LIST, {list: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.SET_CLASS1_LIST] ({commit}, payload) {
    goodsApi.class1List(payload.data, (res) => {
      commit(types.SET_CLASS1_LIST, {list: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.SET_CLASS2_LIST] ({commit}, payload) {
    goodsApi.class2List(payload.data, (res) => {
      commit(types.SET_CLASS2_LIST, {list: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.SEARCH_GOOD] ({commit}, payload) {
    goodsApi.search(payload.data, (res) => {
      if (payload.callback) payload.callback(res)
    })
  }
}

