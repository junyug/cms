import * as types from '../../mutation-types'
import {dsTimelineApi} from '../../../api/index'
export default {
  [types.SET_MODULE_TIMELINE_LIST] ({commit}, payload) {
    dsTimelineApi.list(payload.data, (res) => {
      commit(types.SET_MODULE_TIMELINE_LIST, {list: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.ADD_TIMELINE] ({commit}, payload) {
    dsTimelineApi.add(payload.data, (res) => {
      commit(types.ADD_TIMELINE, {data: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.UPDATE_TIMELINE] ({commit}, payload) {
    dsTimelineApi.update(payload.data, (res) => {
      commit(types.UPDATE_TIMELINE, {data: res})
      if (payload.callback) payload.callback(res)
    })
  },
  [types.DELETE_TIMELINE] ({commit}, payload) {
    dsTimelineApi.delete(payload.data, (res) => {
      commit(types.DELETE_TIMELINE, {data: payload.data})
      if (payload.callback) payload.callback(res)
    })
  }
}

