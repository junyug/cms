/**
 * Created by neo on 16/8/4.
 * author: guojunyu
 * description: page相关数据接口
 */
import API from './fetch'
const interfaces = {
  add: '/page/add-page',
  addMarket: '/page/add-market-page',
  update: '/page/update-by-id',
  list: '/page/get-page-data',
  marketList: '/page/get-page-market-data',
  clone: '/page/clone-page',
  typeList: '/page/get-page-types',
  cityList: '/page/get-city-list',
  getPageById: '/page/get-by-id'
}
export default {
  add (data, success) {
    if (data.type == 4) {
      API.post(interfaces.addMarket, data, success)
    } else {
      API.post(interfaces.add, data, success)
    }
  },
  update (data, success) {
    API.post(interfaces.update, data, success)
  },
  list (data, success) {
    if (data.type == 4) {
      API.get(interfaces.marketList, data, success)
    } else {
      API.get(interfaces.list, data, success)
    }
  },
  clone (data, success) {
    API.post(interfaces.clone, data, success)
  },
  cityList (data, success) {
    API.get(interfaces.cityList, data, success)
  },
  typeList (data, success) {
    API.get(interfaces.typeList, data, success)
  },
  getPageById (data, success) {
    API.get(interfaces.getPageById, data, success)
  },
  deletePageModuleById (data, success) {
    API.post(interfaces.deletePageModule, data, success)
  },
  getModuleGroupList (data, success) {
    API.get(interfaces.getModuleGroupList, data, success)
  },
  getPageModules (data, success) {
    API.get(interfaces.getPageModules, data, success)
  },
  addPageModule (data, success) {
    API.post(interfaces.addPageModule, data, success)
  },
  getPageModuleData (data, success) {
    API.get(interfaces.getPageModuleData, data, success)
  },
  sortPageModule (data, success) {
    API.post(interfaces.sortPageModule, data, success)
  },
  updateModuleById (data, success) {
    API.post(interfaces.updateModuleById, data, success)
  }
}
