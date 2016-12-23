import * as types from '../../mutation-types'
export default {
  [types.DS_ITEM_LIST] (state, getters, rootState) {
    return state.list
  }
}

