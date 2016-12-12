/**
 * Created by neo on 16/8/4.
 * author: guojunyu
 * description: page相关数据接口
 */
import API from './fetch'
const interfaces = {
  getPageTypesList: '/page/get-page-types',
  getCitys: '/page/get-city-list',
  add: '/page/add-page',
  addMarketPage: '/page/add-market-page',
  getPageData: '/page/get-page-data',
  getMarketData: '/page/get-page-market-data',
  clonePage: '/page/clone-page',
  getPageById: '/page/get-by-id',
  update: '/page/update-by-id'
}
export default {
  getLastTimeline (pageId, success) {
    API.get(interfaces.getLastTimeline, {'page_id': pageId}, success)
  },
  add (data, success) {
    if (data.type == 4) {
      API.post(interfaces.addMarketPage, data, success)
    } else {
      API.post(interfaces.add, data, success)
    }
  },
  update (data, success) {
    API.post(interfaces.update, data, success)
  },
  getList (data, success) {
    if (data.type == 4) {
      API.get(interfaces.getMarketData, data, success)
    } else {
      API.get(interfaces.getPageData, data, success)
    }
  },
  getCitys (data, success) {
    API.get(interfaces.getCitys, data, success)
  },
  getPageTypesList (data, success) {
    API.get(interfaces.getPageTypesList, data, success)
  },
  getPageById (data, success) {
    API.get(interfaces.getPageById, data, success)
  },
  deletePageModuleById (data, success) {
    API.post(interfaces.deletePageModule, data, success)
  },
  clonePage (data, success) {
    API.post(interfaces.clonePage, data, success)
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
