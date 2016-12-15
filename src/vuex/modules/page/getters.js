import * as types from '../../mutation-types'
export default {
  [types.GET_LIST] (state, getters, rootState) {
    return state.list
  },
  [types.CITY_LIST] (state, getters, rootState) {
    return state.citys
  },
  [types.TYPE_LIST] (state, getters, rootState) {
    return state.types
  },
  [types.STRUCT_LIST] (state, getters, rootState) {
    return state.structs
  }
}

