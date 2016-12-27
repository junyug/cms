import * as types from '../../mutation-types'
export default {
  [types.GOOD_LIST] (state, getters, rootState) {
    return state.list
  }
}
