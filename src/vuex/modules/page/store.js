import * as types from '../../mutation-types'
import actions from './actions'
import getters from './getters'
export default {
  state: {
    list: [],
    citys: [],
    types: [],
    structs: [
      {id: 1, name: '页面结构'},
      {id: 2, name: '时间点'},
      {id: 3, name: '数据(除商品信息)'}
    ]
  },
  mutations: {
    [types.SET_PAGE_LIST] (state, payload) {
      state.list = payload.list
    },
    [types.SET_CITY_LIST] (state, payload) {
      state.citys = payload.list
    },
    [types.SET_TYPE_LIST] (state, payload) {
      state.types = payload.list
    },
    [types.ADD_PAGE] (state, payload) {
      state.list.push(payload.data)
    },
    [types.UPDATE_PAGE] (state, payload) {
      state.list.forEach((page, index) => {
        if (page.id == payload.data.id) {
          state.list.splice(index, 1, payload.data)
        }
      })
    }
  },
  getters,
  actions
}

