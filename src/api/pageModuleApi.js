/**
 * Created by neo on 16/12/15.
 * author: guojunyu
 * description: pageModule相关数据接口
 */
import API from './fetch'
const interfaces = {
  add: '/page-module/add-page-module',
  list: '/page-module/get-module-group-list',
  update: '/page-module/update-by-id',
  delete: '/page-module/delete-by-id',
  sort: '/page-module/sort-page-module',
  getById: '/page-module/get-by-id',
  getByPageId: '/page-module/get-by-page-id'
}
export default {
  add (data, success) {
    API.post(interfaces.add, data, success)
  },
  update (data, success) {
    API.post(interfaces.update, data, success)
  },
  list (data, success) {
    API.get(interfaces.list, data, success)
  },
  getByPageId (data, success) {
    API.get(interfaces.getByPageId, data, success)
  },
  getById (data, success) {
    API.get(interfaces.getById, data, success)
  },
  delete (data, success) {
    API.post(interfaces.delete, data, success)
  },
  sort (data, success) {
    API.post(interfaces.sort, data, success)
  }
}
