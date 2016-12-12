import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules/index'
// 使用Vuex管理共享状态
Vue.use(Vuex)
export default new Vuex.Store({
  modules: modules
})

