/**
 * Created by neo on 16/8/4.
 * author: guojunyu
 * description: page相关数据接口
 */
import API from './fetch'
const interfaces = {
  list: '/ds-timeline/get-timeline-and-item-by-page-module-id',
  add: '/ds-timeline/add-ds-timeline',
  update: '/ds-timeline/update-by-id',
  delete: '/ds-timeline/delete-by-id'
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
  delete (data, success) {
    API.post(interfaces.delete, data, success)
  }
}
