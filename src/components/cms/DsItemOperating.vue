<template>
  <div class="btn-wrap" v-if="isShow">
    <el-button type="info" @click.stop="addData">新增数据</el-button>
    <el-button type="danger" @click.stop="deleteAllDsItemData">删除全部</el-button>
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
  }
</style>
<script>
  import imageHolder from '../../assets/tpl-image/img_1xn.png'
  function InitParam (img, imgUrl, width, height) {
    return {
      'id': 0,
      'template': 'img',
      'object_img_url': imgUrl || imageHolder,
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
    props: {
      isBefore: false,
      ds_timeline_id: '',
      sourceData: { }
    },
    computed: {
      isShow () {
        return !this.isBefore
      }
    },
    data () {
      return {
        isShow: true
      }
    },
    methods: {
      previewFilter () {
        this.saveDsTimelineData()
        setTimeout(() => {
          this.setTimelineTimestamp(this.$parent.$parent.moduledata.start_time * 1000)
        }, 1000)
      },
      addData () {
        let managerParent = this.$parent.$parent.$parent.$parent.$parent
        if (this.moduleType != 5) {
          managerParent.showImageManagerDialog('add', (data) => {
            data.forEach((value, i) => {
              if (this.moduleType == 4) {
                if (value.width != value.height) {
                  // Toast.error('ICON尺寸要求长宽比1:1')
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
        let data = {'ds_timeline_id': this.ds_timeline_id, 'item_data': JSON.stringify(this.sourceData)}
        this.setDsItemData(data, (res) => {
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
        if (window.confirm('确定要删除全部数据？')) {
          this.batchDeleteDsItem(data, (res) => {
          })
        }
      }
    }
  }
</script>
