import * as types from './mutation-types'
export default {
  [types.SALE_AREA_LIST] (state) {
    return state.saleAreaList
  },
  [types.CLASS1_LIST] (state) {
    return state.class1List
  },
  [types.CLASS2_LIST] (state) {
    return state.class2List
  }
}

