import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import actions from './actions'
import getters from './getters'
import modules from './modules/index'
// 使用Vuex管理共享状态
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    saleAreaList: [],
    class1List: [],
    class2List: []
  },
  mutations: {
    [types.SET_SALE_AREA_LIST] (state, payload) {
      state.saleAreaList = payload.list
    },
    [types.SET_CLASS1_LIST] (state, payload) {
      state.class1List = payload.list
    },
    [types.SET_CLASS2_LIST] (state, payload) {
      state.class2List = payload.list
    }
  },
  actions: actions,
  getters: getters,
  modules: modules
})

