import * as types from '../../mutation-types'
export default {
  [types.GET_LIST] (state, getters, rootState) {
    return state.list
  }
}

