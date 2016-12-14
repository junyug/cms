/**
 * @author: guojunyu
 * @description: axios与后端服务数据交互层封装
 * 提供fetch、get、post三种交互方式,底层调用axios方法实现
 */
import axios from 'axios'
import querystring from 'querystring'
import {Notification} from 'element-ui'
const $ = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})
export default {
  fetch (url, option) {
    $.request({
      url: url,
      method: option['type'] || 'get',
      data: option['data'] || {},
      params: option['data'] || {},
      responseType: option['dataType'] || 'json'
    })
    .then((response) => {
      let res = response.data
      if (typeof (res.error) === 'object') res.error = res.error['msg']
      if (res.ret === 0) {
        return Notification.error({title: '提示', message: res.error})
      }
      if (option['success']) {
        option['success'](res.data)
      }
    })
    .catch((e) => {
      if (option['error']) {
        option['error'](e)
      } else {
        Notification.error({title: '提示', message: '服务器异常,请稍后重试'})
      }
    })
  },
  get (url, data, callback) {
    $.get(url, {params: data})
      .then((response) => {
        this.success(response, callback)
      })
      .catch((e) => {
        Notification.error({title: '错误', message: '服务器异常,请稍后重试'})
      })
  },
  post (url, data, callback) {
    // 在浏览器中使用axios post请求时,data数据是form data
    $.post(url, querystring.stringify(data))
      .then((response) => {
        this.success(response, callback)
      })
      .catch((e) => {
        Notification.error({title: '错误', message: '服务器异常,请稍后重试'})
      })
  },
  success (response, callback) {
    let res = response.data
    if (typeof (res.error) === 'object') res.error = res.error['msg']
    if (res.ret === 0) {
      return Notification.error({title: '提示', message: res.error})
    }
    if (callback) callback(res.data)
  }
}
