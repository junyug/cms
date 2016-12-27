<template>
  <div class="btn-wrap" v-if="isShow">
    <el-button v-if="module.module.ds_type != 1" type="info" @click.stop="addData">新增数据</el-button>
    <el-popover
      placement="top"
      ref="delpop"
      title="警告">
      <p>确定删除全部数据？</p>
      <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click.stop="cancel">取消</el-button>
      <el-button type="primary" size="mini" @click.stop="confirmDel">确定</el-button>
      </div>
      <el-button slot="reference" type="danger">删除全部</el-button>
    </el-popover>
    <el-button @click.stop="saveDsTimelineData">保存</el-button>
    <el-button type="success" @click.stop="previewFilter">保存并预览</el-button>
  </div>
</template>
<style lang="scss" scoped>
  .btn-wrap {
    text-align: right;
    background: #fff;
    border: 1px solid #e0e6ed;
    border-top: none;
    padding: 10px;
    .el-button--success {
      margin-left: 0;
    }
  }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import {Notification} from 'element-ui'
  function InitParam (img, imgUrl, width, height) {
    return {
      'id': 0,
      'object_img_url': imgUrl || '',
      'object_img': img || '',
      'img_width': width || '0',
      'img_height': height || '0',
      'object_name': '',
      'h5_url': '',
      'app_url': '',
      'url_id': '',
      'url_type': '',
      'url_name': '',
      'user_type': 0
    }
  }
  export default {
    name: 'dsOperate',
    computed: {
      ...mapGetters({
        module: types.OPERATE_MODULE,
        dsItems: types.DS_ITEM_LIST,
        dsTimelineId: types.OPERATE_TIMELINE_ID
      }),
      isShow () {
        return !this.isBefore
      },
      moduleType () {
        return this.module.module.type
      },
      sourceData () {
        return this.dsItems
      }
    },
    props: {
      isBefore: false,
      ds_timeline_id: ''
    },
    data () {
      return {
        isShow: true
      }
    },
    methods: {
      ...mapActions({
        setDsItemData: types.BATCH_UPDATE_ITEM,
        batchDeleteDsItem: types.BATCH_DELETE_ITEM
      }),
      cancel () {
        this.$refs.delpop.showPopper = false
      },
      confirmDel () {
        this.deleteAllDsItemData()
      },
      previewFilter () {
        this.saveDsTimelineData()
        setTimeout(() => {
          this.setTimelineTimestamp(this.$parent.$parent.moduledata.start_time * 1000)
        }, 1000)
      },
      addData () {
        let managerParent = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        if (this.moduleType != 5) {
          managerParent.showImageManagerDialog('add', (data) => {
            data.forEach((value, i) => {
              if (this.moduleType == 4) {
                if (value.width != value.height) {
                  Notification.error({title: '提示', message: 'ICON尺寸要求长宽比1:1'})
                } else {
                  this.sourceData.push(new InitParam(value.name, value.url, value.width, value.height))
                }
              } else {
                this.sourceData.push(new InitParam(value.name, value.url, value.width, value.height))
              }
            })
          })
        } else {
          this.sourceData.push(new InitParam())
        }
      },
      saveDsTimelineData () {
        this.sourceData = this.sourceData.filter((obj) => {
          return obj !== null
        })
        let data = {'ds_timeline_id': this.dsTimelineId, 'item_data': JSON.stringify(this.sourceData)}
        this.setDsItemData({
          data: data,
          callback: (res) => {
            Notification.success({title: '提示', message: '数据保存成功'})
          }
        })
      },
      deleteAllDsItemData () {
        let ids = []
        this.sourceData = this.sourceData.filter((obj) => {
          return obj !== null
        })
        this.sourceData.forEach((value, index) => {
          if (value.id != 0) {
            ids.push(value.id)
          }
        })
        let data = {'ids': ids.join(','), 'ds_timeline_id': this.ds_timeline_id}
        this.batchDeleteDsItem({
          data: data,
          callback: (res) => {
            Notification.success({title: '提示', message: '数据删除成功'})
            this.$refs.delpop.showPopper = false
          }
        })
      }
    }
  }
</script>
