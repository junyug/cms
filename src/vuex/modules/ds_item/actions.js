import * as types from '../../mutation-types'
import {dsItemApi} from '../../../api/index'
export default {
  [types.SET_DS_ITEM_LIST] ({commit}, payload) {
    commit(types.SET_DS_ITEM_LIST, {list: payload.data})
  },
  [types.DELETE_ITEM] ({commit}, payload) {
    dsItemApi.delete(payload.data, (res) => {
      commit(types.DELETE_ITEM, {data: payload.data})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.BATCH_UPDATE_ITEM] ({commit}, payload) {
    dsItemApi.batchUpdate(payload.data, (res) => {
      commit(types.BATCH_UPDATE_ITEM, {list: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.BATCH_DELETE_ITEM] ({commit}, payload) {
    dsItemApi.batchDelete(payload.data, (res) => {
      commit(types.BATCH_DELETE_ITEM, {data: res})
      if (payload.callback) payload.callback(res)
    })
  }
}

