import $ from 'axios'
import API from './fetch'
const interfaces = {
  upload: '/img-material/upload-img-files', // city_id=1
  get: '/img-material/get'
}

export default {
  get (data, success) {
    data['size'] = 20
    API.get(interfaces.get, data, success)
  },
  // 分类下商品
  upload (files, success) {
    var formData = new window.FormData()
    if (files instanceof window.File) {
      var fileObj = files
      files = [fileObj]
    }
    for (var i = 0, fileCount = files.length; i < fileCount; i++) {
      var file = files[i]
      var fileName = file.name
      formData.append('files[' + fileName + ']', file)
    }
    $({
      method: 'post',
      timeout: 0,
      url: interfaces.upload,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      responseType: 'json',
      onUploadProgress: () => {

      }
    }).then((res) => {
      success(res.data)
    }).catch((e) => {
      success()
    })
  }
}
