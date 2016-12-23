import * as types from '../../mutation-types'
import {dsItemApi} from '../../../api/index'
export default {
  [types.SET_DS_ITEM_LIST] ({commit}, payload) {
    commit(types.SET_DS_ITEM_LIST, {list: payload.data})
  },
  [types.ADD_ITEM] ({commit}, payload) {
    dsItemApi.add(payload.data, (res) => {
      commit(types.ADD_ITEM, {data: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.UPDATE_ITEM] ({commit}, payload) {
    dsItemApi.update(payload.data, (res) => {
      commit(types.UPDATE_ITEM, {data: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.DELETE_ITEM] ({commit}, payload) {
    dsItemApi.delete(payload.data, (res) => {
      commit(types.DELETE_ITEM, {data: payload.data})
      if (payload.callback) payload.callback(res)
    })
  }
}

