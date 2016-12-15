<template>
  <el-dialog :title='title' v-model="dialogVisible" @close="closeDialog">
    <el-form :model="pageData" label-width="120px" class="dialog-content">
      <el-form-item label="ID">
        <el-input :disabled="true" size="small" v-model="pageData.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input size="small" v-model="pageData.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input size="small" v-model="pageData.remark" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          :editable="true"
          v-model="endtime"
          type="datetime"
          placeholder="选择日期时间"
          align="left"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="分享" v-if="$root.buId == 2">
        <el-checkbox v-model="shareOpen">设置分享信息</el-checkbox>
      </el-form-item>
      <el-row class="share-info-box" type="flex" v-show="$root.buId == 2 && shareOpen">
        <el-col :span="16">
          <el-form-item label="标题">
            <el-input placeholder="少于28个字" size="small" v-model="pageData.share_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input placeholder="少于45个字" type="textarea" v-model="pageData.share_desc" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="链接">
            <el-input placeholder="URL链接" size="small" v-model="pageData.share_url" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-upload class="upload-box"
            action="/ds-item/upload-img"
            type="select"
            :thumbnail-mode="true"
            :with-credentials="true"
            :data="reqopts.form"
            :headers="reqopts.headers"
            :default-file-list="fileList"
            :on-success="uploadSuccess"
          ></el-upload>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">完成</el-button>
    </div>
  </el-dialog>
</template>
<style lang='scss'>
  .dialog-content {
    .el-form-item {
      margin-bottom: 10px;
      .el-input {
        width: 400px;
      }
    }
    .share-info-box {
      .el-input {
        width: auto;
      }
    }
    .upload-box {
      width: 102px;
      height: 102px;
      margin-left: 15px;
      overflow: hidden;
      .el-upload__inner {
        height: 102px;
        width: 100%;
        .el-dragger__cover__interact {
          top: -30px;
        }
      }
    }
  }
</style>
<script>
  import {mapActions} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import {Notification} from 'element-ui'
  import defaultIcon from '../../assets/image/icon-default.png'
  export default {
    name: 'pageInfoDialog',
    props: {
      title: '',
      showEdit: false,
      page: { }
    },
    data () {
      return {
        shareOpen: false,
        reqopts: {
          form: {'template_code': 'share'},
          headers: {
            accept: 'application/json, text/javascript, */*;'
          }
        },
        pickerOptions: {
          shortcuts: [
            {
              text: [new Date(this.$root.time * 1000).getHours(), '00'].join(':'),
              onClick: (picker) => {
                const date = new Date(this.$root.time * 1000)
                picker.$emit('pick', date)
              }
            },
            {
              text: '此刻',
              onClick: (picker) => {
                const date = new Date()
                let seconds = date.getSeconds()
                picker.$emit('pick', date.getTime() + 1000 * 60 - seconds * 1000)
              }
            }
          ]
        }
      }
    },
    computed: {
      pageData () {
        return this.page
      },
      dialogVisible () {
        return this.showEdit
      },
      fileList () {
        return [{name: this.pageData.share_img || 'defaultIcon', url: this.pageData.share_img_url || defaultIcon}]
      },
      'endtime': {
        get () {
          return this.pageData.end_time * 1000
        },
        set (val) {
          this.pageData.end_time = val / 1000
        }
      },
      'shareOpen': {
        get () {
          return !!this.pageData.is_share
        },
        set (val) {
          this.pageData.is_share = val ? 1 : 0
        }
      }
    },
    methods: {
      ...mapActions({
        add: types.ADD_PAGE,
        update: types.UPDATE_PAGE
      }),
      closeDialog () {
        this.$emit('close', false)
      },
      uploadSuccess (response, file, fileList) {
        if (response.ret !== 1) {
          Notification.error({title: '提示', message: response.error.msg})
          this.fileList = fileList = fileList.splice(1, 1)
        } else {
          let imgData = response.data
          this.pageData.share_img = imgData.img
          this.pageData.share_img_url = imgData.img_url
        }
      },
      createPage () {
        if (this.pageData.share_img == defaultIcon) {
          this.pageData.share_img = ''
          this.pageData.share_img_url = ''
        }
        this.add({
          data: this.pageData,
          callback: (res) => {
            this.$router.push({name: 'pageedit', params: {id: res.id}})
            this.closeDialog()
          }
        })
      },
      editPage () {
        this.update({
          data: this.pageData,
          callback: (res) => {
            this.closeDialog()
            Notification.success({title: '提示', message: '修改成功'})
          }
        })
      },
      submit () {
        if (this.pageData.id == 0) {
          this.createPage()
        } else {
          this.editPage()
        }
      }
    }
  }
</script>
