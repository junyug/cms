import * as types from '../../mutation-types'
import actions from './actions'
import getters from './getters'
export default {
  state: {
    list: []
  },
  mutations: {
    [types.SET_PAGE_LIST] (state, payload) {
      state.list = payload.list
    },
    [types.ADD_PAGE] (state, payload) {
      state.list.push(payload.data)
    },
    [types.UPDATE_PAGE] (state, payload) {
      state.list.forEach((page, index) => {
        if (page.id == payload.data.id) {
          state.list[index] = payload.data
        }
      })
    }
  },
  getters,
  actions
}

