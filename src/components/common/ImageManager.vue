<template>
  <el-dialog class="image-manager-box" :title="title" v-model="isShow" @close="hide">
    <el-tabs :active-name="active.toString()" @tab-click="changeTab">
      <el-tab-pane name="1" label="我的图片">
        <div class="tab-content">
          <div v-if="loading" class="loading-mask"><i class="fa fa-spinner fa-pulse fa-fw"></i></div>
          <div :class="['tab-pane', 'active']">
            <div class="search-bar">
              <div class="search-box-wrapper">
                <el-input size='small' placeholder="搜索页面" icon="search" v-model.lazy="params.name"></el-input>
              </div>
            </div>
            <div v-if="hasMyFiles()" v-for="(value, key) in myfiles">
              <div class="image-day-header"><span>{{key}}</span></div>
              <div class="image-list">
                <div v-for="item in value" :class="['image-item', {'selected': hasInSelected(item)}]" @click="toggleFileStatus(item)">
                  <div class="img-wrapper">
                    <img :src="item.img_url">
                  </div>
                  <div class="img-name">
                    <span>{{item.name}}</span>
                  </div>
                  <div class="img-meta">
                    <span>{{item.width}} * {{item.height}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!hasMyFiles()" class="no-tip">暂无图片上传!</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="0" label="所有图片">
        <div class="tab-content">
          <div v-if="loading" class="loading-mask"><i class="fa fa-spinner fa-pulse fa-fw"></i></div>
          <div :class="['tab-pane', 'active']">
            <div class='search-bar'>
              <div class='search-box-wrapper'>
                <el-input size='small' placeholder="搜索页面" icon="search" v-model.lazy="params.name"></el-input>
              </div>
            </div>
            <div  v-if='hasAllFiles()'  v-for="(value, key) in allfiles">
              <div class='image-day-header'><span>{{key}}</span></div>
              <div class='image-list'>
                <div v-for='item in value' :class="['image-item', {'selected': hasInSelected(item)}]" @click='toggleFileStatus(item)'>
                  <div class='img-wrapper'>
                    <img :src='item.img_url'>
                  </div>
                  <div class='img-name'>
                    <span>{{item.name}}</span>
                  </div>
                  <div class='img-meta'>
                    <span>{{item.width}} * {{item.height}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if='!hasAllFiles()' class='no-tip'>暂无图片 :(</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2" label="上传新图片">
        <div class="tab-content">
          <div :class="['tab-pane', 'active']">
            <ol class='upload-status'>
              <li v-for='uploadFile in uploadFiles' @click='toggleFileStatus(uploadFile)'>
                <span class='f-chk'>
                  <i v-if='uploadFile.id && hasInSelected(uploadFile)' class='fa fa-check-square-o' aria-hidden='true'></i>
                  <i v-if='uploadFile.id && !hasInSelected(uploadFile)' class='fa fa-square-o' aria-hidden='true'></i>
                  <i v-if='!uploadFile.id' class='fa fa-warning' aria-hidden='true'></i>
                </span>
                <span class='f-name'>{{ uploadFile.name }}</span>
                <span class='f-type'>{{ uploadFile.type }}</span>
                <span class='f-size'>{{ uploadFile.size }}</span>
                <span class='f-status'>
                  <i v-if="uploadFile.status=='loading'" class='fa fa-spinner fa-pulse fa-fw'></i>
                  <i v-if="uploadFile.status=='success'" class='fa fa-check' style='color:#7caede' aria-hidden='true'></i>
                  <i v-if="uploadFile.status=='failed'" class='fa fa-times' style='color:#f39999' aria-hidden='true'></i>
                </span>
                <span class='f-url'><img :src='uploadFile.url' /></span>
                <span class='f-error'>{{ uploadFile.error }}</span>
              </li>
            </ol>
            <div v-if='uploadFiles.length == 0'>
              <br/><br/><br/><br/><br/>
              <div class='upload-pane' @click='selectFiles'>
                <i class='fa fa-upload'></i>
                <div class='tip'>将文件拖放到此处，或<button>点击上传</button></div>
              </div>
              <div class='upload-tip'>只能上传 jpg/png 文件，且不超过100kb</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class='clearfix footer'>
      <div class='img-dialog-pager' v-if='active != 2'>
        <el-pagination v-show='totalPage > 0' class="pagination"
          layout='prev, pager, next'
          :total='totalPage'
          :current-page='curPage'
          :page-size='pageSize'
          @current-change='pageChange'></el-pagination>
      </div>
      <div class="bottom-button-box">
        <span v-if='active == 2 && uploadFiles.length > 0' class='upload-tip'>只能上传 jpg/png 文件，且不超过100kb</span>
        <el-button type="primary" v-if='active == 2 && uploadFiles.length > 0'  @click='upload'>上传图片</el-button>
        <el-button type="success" v-if='selected.length > 0' @click='submit'>确定使用</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<style lang="css">
  @-webkit-keyframes fa-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
  @keyframes fa-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
  .fa-pulse {
      -webkit-animation: fa-spin 1s infinite steps(8);
      animation: fa-spin 1s infinite steps(8);
  }
  .dropNotification{
    border: dashed 2px #bbc505!important;
    background-color: #fdffbe!important;
  }
</style>
<style lang="scss">
  .image-manager-box {
    .el-dialog__body {
      padding-top: 10px;
    }
    .el-tabs {
      width: 100%;
    }
  }
  .no-tip{
    text-align: center;
    color: #AAA;
    line-height: 300px;
    font-size: 22px;
    letter-spacing: 1px;
  }
  .search-bar{
    text-align: right;
    clear: both;
    margin-bottom: 10px;
    padding-right: 20px;
    .search-box-wrapper{
      display: inline-block;
      position: relative;
      .fa{
        position: absolute;
        top: 6px;
        right: 6px;
        color: #AAA;
        font-size: 18px;
      }
      .search-box{
        background: #FAFAFA;
        border: solid 1px #Ececec;
        width: 250px;
        border-radius: 3px;
        line-height: 26px;
        text-indent: 2px;
        &:focus{
          outline: none;
          border: solid 1px #3d82c4;
        }
      }
    }
  }
.footer {
  height: 34px;
  text-align: right;
  margin-top: 10px;
  .img-dialog-pager {
    float: left;
    padding-top: 3px;
  }
  .bottom-button-box {
    float: right;
  }
}
</style>
<style lang="scss" scoped>
  .loading-mask{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(54, 125, 194, 0.11);
    text-align: center;
    .fa{
      font-size: 50px;
      color: green;
      margin-top: 210px;
    }
  }

  .image-day-header{
    text-align: right;
    margin-bottom: 5px;
    clear: both;
    span{
      font-size: 14px;
      color: #9B9B9B;
      padding-right: 20px;
    }
  }
  .image-list{
    clear: both;
    overflow: visible;
  }
  .image-item{
    width: 120px;
    height: 162px;
    float: left;
    margin: 8px;

    .img-wrapper{
      // background: rgba(153, 177, 226, 0.14)
      height: 120px;
      width:120px;
      padding: 8px;
      border-radius: 8px;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
    &:hover {
      .img-wrapper {
        background: #E9E9E9;
      }
    }
    .img-name{
      text-align: center;
      font-size: 14px;
      color: #4A4A4A;
      line-height: 30px;
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      span{
        font-size: 13px;
        padding: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .img-meta{
      text-align: center;
      font-size: 8px;
      color: #9B9B9B;
    }
    &.selected{
        .img-wrapper{
           background: #E9E9E9;
          position: relative;
          &::after{
            // content: '\2714'
            // color: green
            // position: absolute
            // top: -15px
            // right: 0px
            // font-size: 22px
          }
        }
        .img-name{
          span{
            background: #064582;
            border-radius: 3px;
            font-size: 13px;
            color: #FFFFFF;
          }
        }
    }
  }
  .tab-content {
    position: relative;
  }
  .tab-content > .tab-pane {
    height: 450px;
    overflow: auto;
    max-height: 100%;
    display: none;
    &.active {
      display: block;
    }
  }
  #myTab{
    padding: 0;
    border-bottom: none;
    li{
      font-size: 14px;
      color: #9B9B9B;
      display: inline;
      margin:0px 10px;
      cursor: pointer;
      &.active{
        color: #2D77BF;
        border-bottom: solid 3px #2D77BF;
        cursor: default;
      }
    }
    .slt-tip{
    cursor: default;
    color: #4cae4c;
    letter-spacing: 1px;
    span {
      color: #f00;
    }
  }
	}
  .upload-pane{
    background: #F9FAFC;
    border: 1px solid #C0CCDA;
    border-radius: 4px;
    cursor: pointer;
    width: 40%;
    margin: 0px auto;
    height: 200px;
    text-align: center;
    .fa{
      font-size: 60px;
      color: #99A9BF;
      margin-top: 40px;
      margin-bottom: 10px;
    }
    .tip{
      font-size: 14px;
      color: #99A9BF;
    }
    button{
      font-size: 14px;
      color: #2D77BF;
      line-height: 14px;
      border: none;
      background: transparent;
      cursor: pointer;
    }
  }
  .upload-tip{
    text-align: center;
    font-size: 12px;
    color: #8492A6;
    letter-spacing: 0px;
    line-height: 14px;
    padding: 10px;
  }
  .upload-status{
    padding: 0px;
    margin: 0;
    text-align: left;
    list-style:none;
    li{
      line-height: 16px;
      margin-bottom: 5px;

      &:nth-child(odd) {
          background-color: rgba(238, 238, 238, 0.3);
      }
      &:hover{
        background-color: rgba(226, 217, 217, 0.3);
      }
      >span{
        display: inline-block;
      }
      .f-chk{
        margin: 0px 5px;
        vertical-align: middle;
        .fa{
          font-size: 16px;
          color: #7caede;
          &.fa-check-square-o{
            color: green;
            font-size: 20px;
          }
        }
        .fa-warning{
          color:#7caede !important;
        }
      }
      .f-name{
        width:170px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #7caede;
        padding-right: 10px;
        height: 1.2em;
        vertical-align: middle;
      }
      .f-size{
        width:50px;
      }
      .f-error{
        color:red;
      }
      .f-status{
        width:40px;
        .fa{
          font-size: 20px;
        }
      }
      .f-type{
        width:50px;
      }
    }
    img{
      height:50px;
      vertical-align: middle;
    }
  }
</style>
<script>
  import {imageApi} from '../../api/index'
  export default {
    name: 'imageManager',
    props: {
      operate: String,
      showModal: false,
      callback: Function
    },
    computed: {
      isShow () {
        return this.showModal
      },
      type () {
        return this.operate
      },
      success () {
        return this.callback
      }
    },
    data () {
      return {
        title: '选择图片',
        loading: false,
        active: 1,
        style: {
          padding: 0,
          width: '760px'
        },
        selected: [],
        uploadFiles: [],
        myfiles: {},
        allfiles: {},
        curPage: 1,
        totalPage: 0,
        pageSize: 20,
        params: {
          is_my: 1,
          page: 0,
          name: ''
        }
      }
    },
    watch: {
      params: {
        handler () {
          if (this.params.is_my != 2) {
            this.getFiles()
          }
        },
        deep: true
      }
    },
    mounted () {
      this.$nextTick(function () {
        var $dd = document.querySelector('.upload-pane')
        this.regDD($dd)
        this.regDD(document.querySelector('.upload-status'))
      })
      this.params.page = 1
    },
    methods: {
      hasMyFiles () {
        return !!Object.keys(this.myfiles).length
      },
      hasAllFiles () {
        return !!Object.keys(this.allfiles).length
      },
      submitSearch (e) {
        var val = e.target.value || ''
        this.params.page = 1
        this.params.name = val
      },
      getFiles () {
        this.loading = true
        imageApi.get(this.params, (data) => {
          if (this.params.is_my == 1) {
            this.myfiles = data.rows
          } else if (this.params.is_my == 0) {
            this.allfiles = data.rows
          }
          this.curPage = parseInt(data.page)
          this.totalPage = data.total_page
          this.loading = false
        })
      },
      pageChange (pageIndex) {
        this.params.page = this.curPage = pageIndex
      },
      toggleFileStatus (file) {
        if (!file || !file.id) return
        var selected = this.selected
        var index = -1
        for (var i = 0; i < selected.length; i++) {
          if (selected[i]['id'] == file['id']) {
            index = i
          }
        }
        if (index != -1) {
          this.selected.splice(index, 1)
        } else {
          if (this.type == 'add') {
            this.selected.push(file)
          } else {
            this.selected = [file]
          }
        }
      },
      hasInSelected (file) {
        var selected = this.selected
        var index = -1
        for (var i = 0; i < selected.length; i++) {
          if (selected[i]['id'] == file['id']) {
            index = i
          }
        }
        return index > -1
      },
      regDD ($dd) {
        var self = this
        $dd.addEventListener('dragenter', function (e) {
          $dd.classList.add('dropNotification')
        })
        $dd.addEventListener('dragover', function (e) {
          $dd.classList.add('dropNotification')
          e.preventDefault()
        })
        $dd.addEventListener('drop', function (e) {
          $dd.classList.remove('dropNotification')
          self.uploadFilesAction(e.originalEvent.dataTransfer.files)
          return false
        })
        $dd.addEventListener('dragleave', function (e) {
          $dd.remove('dropNotification')
        })
      },
      show () {
        this.showModal = true
      },
      hide () {
        this.selected = []
        this.uploadFiles = []
        this.$emit('closeImgManager', false)
      },
      changeTab (tab) {
        let index = tab.name
        this.active = this.params.is_my = index
        this.params.page = 1
        this.uploadFiles = []
      },
      submit () {
        this.success(this.selected.map((file) => {
          return {
            name: file['path'],
            url: file['img_url'],
            width: file['width'],
            height: file['height']
          }
        }))
        this.hide()
        this.selected = []
      },
      upload () {
        this.selectFiles()
      },
      uploadFilesAction (files) {
        var self = this
        var newFiles = []
        for (var i = 0; i < files.length; i++) {
          var file = files[i]
          newFiles.push({
            id: '',
            name: file['name'],
            size: (file['size'] / 1024).toFixed(1) + 'k',
            type: file['type'].replace('image/', ''),
            status: 'loading',
            url: window.URL.createObjectURL(file),
            error: '',
            path: ''
          })
        }
        self.uploadFiles = self.uploadFiles.concat(newFiles)
        imageApi.upload(files, (res) => {
          var tmpFiles = self.uploadFiles
          var updateStatus = function (newFiles, st, err) {
            for (var i = 0; i < newFiles.length; i++) {
              for (var j = 0; j < tmpFiles.length; j++) {
                if (newFiles[i]['name'] == tmpFiles[j]['name']) {
                  if (st == 'success') {
                    tmpFiles[j]['id'] = newFiles[i]['id']
                    tmpFiles[j]['img_url'] = newFiles[i]['img_url']
                    tmpFiles[j]['width'] = newFiles[i]['width']
                    tmpFiles[j]['height'] = newFiles[i]['height']
                    tmpFiles[j]['path'] = newFiles[i]['path']
                  }
                  tmpFiles[j]['status'] = st
                  tmpFiles[j]['error'] = newFiles[i]['error'] || err
                }
              }
            }
            self.uploadFiles = tmpFiles
          }
          if (res) {
            if (res.data) {
              if (res.data.success && res.data.success.length) {
                updateStatus(res.data.success, 'success')
              }
              if (res.data.fail && res.data.fail.length) {
                updateStatus(res.data.fail, 'failed')
              }
              return
            }
          }
          updateStatus(tmpFiles, 'failed', '网络错误或服务器错误!')
        })
      },
      selectFiles () {
        var self = this
        if (!this.imgSelector) {
          var imgSelector = document.createElement('input')
          imgSelector.type = 'file'
          imgSelector.setAttribute('multiple', 'multiple')
          // imgSelector.setAttribute('accept', 'image/gif, image/jpeg, image/png, image/jpg')
          this.imgSelector = imgSelector
          imgSelector.addEventListener('click', function () {
            this.value = ''
          })
          imgSelector.addEventListener('change', function () {
            self.uploadFilesAction(this.files)
          })
        }
        this.imgSelector.click()
      }
    }
  }
</script>
