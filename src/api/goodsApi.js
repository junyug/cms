import API from './fetch'
const interfaces = {
  saleAreaList: '/gis/get-sale-area-by-city-id', // city_id=1
  class1List: '/goods/get-class1', // ?city_id=131
  class2List: '/goods/get-class2', // ?city_id=131
  goods: '/goods/get-by-class-id', // ?class_id=1133
  search: '/goods/search-goods' // city_id=131&name=%E8%8F%9C
}
export default {
  // 获取售卖区域
  saleAreaList (data, success) {
    API.get(interfaces.saleAreaList, data, success)
  },
  // 获取分类
  class1List (data, success) {
    API.get(interfaces.class1List, data, success)
  },
  class2List (data, success) {
    API.get(interfaces.class2List, data, success)
  },
  // 分类下商品
  goods (data, success) {
    API.get(interfaces.goods, data, success)
  },
  // 搜索商品
  search (data, success) {
    API.get(interfaces.search, data, success)
  }
}
