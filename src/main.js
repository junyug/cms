/**
 *@name App入口文件
 *@description
 * App全局入口，路由信息，App挂载，全局数据定义，主题样式引入
 *@author guojunyu
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/main.scss'
import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFilter from 'vue-filter'
import routes from './routes'
import store from './vuex/store'
import App from './components/App'
import {
  Row, Col,
  Table, TableColumn,
  Menu, MenuItem,
  Button, Input, Form, FormItem,
  Tabs, TabPane, Dialog,
  Pagination} from 'element-ui'
// 按需引入样式
[Row, Col,
  Table, TableColumn, Menu, MenuItem,
  Button, Input, Form, FormItem,
  Tabs, TabPane, Dialog, Pagination
].map(component => {
  Vue.use(component)
})
Vue.use(VueRouter)
Vue.use(VueFilter)
const router = new VueRouter({
  mode: 'hash',
  routes
})
new Vue({
  data () {
    return {
      buId: 1
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
/* eslint-disable no-new */
