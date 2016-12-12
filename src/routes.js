/**
 *@name 路由规则
 *@description 统一管理路由入口
 *@author guojunyu
 *@version 1.0.0
 */
import PageList from './components/cms/PageList'
import PageEdit from './components/cms/PageEdit'
const routers = [
  {path: '/pagelist/:type', name: 'pagelist', component: PageList},
  {path: '/pageedit/:id', name: 'pageedit', component: PageEdit},
  {path: '*', redirect: {name: 'pagelist', params: {type: 1}}}
]
export default routers
