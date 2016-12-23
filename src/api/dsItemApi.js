/**
 * Created by neo on 16/8/4.
 * author: guojunyu
 * description: page相关数据接口
 */
import API from './fetch'
const interfaces = {
  batchUpdate: '/ds-item/batch-update-ds-item',
  batchDelete: '/ds-item/delete-by-ids',
  delete: '/ds-item/delete-by-id'
}
export default {
  batchUpdate (data, success) {
    API.post(interfaces.batchUpdate, data, success)
  },
  batchDelete (data, success) {
    API.post(interfaces.batchDelete, data, success)
  },
  delete (data, success) {
    API.post(interfaces.delete, data, success)
  }
}
