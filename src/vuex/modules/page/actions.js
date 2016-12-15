import * as types from '../../mutation-types'
import {pageApi} from '../../../api/index'
export default {
  [types.SET_PAGE_LIST] ({commit}, playlod) {
    pageApi.list(playlod.data, (res) => {
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
  },
  [types.CLONE_PAGE] ({commit}, playlod) {
    pageApi.clone(playlod.data, (res) => {
      if (playlod.callback) playlod.callback(res)
    })
  },
  [types.SET_CITY_LIST] ({commit}, playlod) {
    pageApi.cityList(playlod.data, (res) => {
      commit(types.SET_CITY_LIST, {list: res})
      if (playlod.callback) playlod.callback(res)
    })
  },
  [types.SET_TYPE_LIST] ({commit}, playlod) {
    pageApi.typeList(playlod.data, (res) => {
      commit(types.SET_TYPE_LIST, {list: res})
      if (playlod.callback) playlod.callback(res)
    })
  }

}

