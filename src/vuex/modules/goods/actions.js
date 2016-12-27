import * as types from '../../mutation-types'
import {goodsApi} from '../../../api/index'
export default {
  [types.SET_GOOD_LIST] ({commit}, payload) {
    goodsApi.goods(payload.data, (res) => {
      commit(types.SET_GOOD_LIST, {list: res.rows})
      if (payload.callback) payload.callback(res)
    })
  }
}

