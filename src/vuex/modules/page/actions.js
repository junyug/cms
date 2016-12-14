import * as types from '../../mutation-types'
import {pageApi} from '../../../api/index'
export default {
  [types.SET_PAGE_LIST] ({commit}, playlod) {
    pageApi.getList(playlod.data, (res) => {
      commit(types.SET_PAGE_LIST, {list: res.rows})
      if (playlod.callback) playlod.callback(res)
    })
  },
  [types.ADD_PAGE] ({commit}, playlod) {
    pageApi.add(playlod.data, (res) => {
      commit(types.ADD_PAGE, {data: res})
      if (playlod.callback) playlod.callback(res)
    })
  },
  [types.UPDATE_PAGE] ({commit}, playlod) {
    pageApi.update(playlod.data, (res) => {
      commit(types.UPDATE_PAGE, {data: res})
      if (playlod.callback) playlod.callback(res)
    })
  }
}

