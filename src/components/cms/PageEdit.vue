<template>
  <section id="pageedit">
    <image-manager v-if="timelineShow && showImageManager" :show-modal="showImageManager" :callback="callback" @closeImgManager="closeImgManager" :operate="operate"></image-manager>
    <el-row type="flex" justify="center" align="top">
      <el-col class="wrap-container">
        <section class="preview-box">
          <preview-container @switchBox="switchBox"></preview-container>
        </section>
      </el-col>
      <el-col class="bg-purple">
        <section :class="{'main-editor-box':1, 'main-box-fixed': isFixed}">
          <module-list v-if="modulesShow"></module-list>
          <timeline-edit v-if="timelineShow"></timeline-edit>
        </section>
      </el-col>
    </el-row>
  </section>
</template>
<style lang="scss" scoped>
  #pageedit {
    .wrap-container {
      width: 330px;
    }
    .bg-purple {
      background: #e5e9f2;
    }
    .main-editor-box {
      box-sizing: border-box;
      margin: 0 10px;
    }
  }
</style>
<script>
  import PreviewContainer from './PreviewContainer'
  import ModuleList from './ModuleList'
  import TimelineEdit from './TimelineEdit'
  import ImageManager from '../common/ImageManager'
  export default {
    name: 'pageEdit',
    data () {
      return {
        isFixed: false,
        modulesShow: true,
        timelineShow: false,
        showImageManager: false,
        showUrl: false,
        operate: 'add',
        callback: () => {},
        dsItem: {}
      }
    },
    methods: {
      switchBox (value) {
        this.modulesShow = value.modulesShow
        this.timelineShow = value.timelineShow
      },
      showUrlDialog (data) {
        this.showUrl = true
        this.dsItem = data
      },
      /**
      * type: {{String}} 'add':'新增数据','edit': '编辑数据'
      * 新增可以选择多张图片，编辑只能选择1张图片
      * callback: {{Function}} 回调函数
      */
      showImageManagerDialog (type, callback) {
        this.operate = type
        this.callback = callback
        this.showImageManager = true
      },
      editImg (item) {
        this.showImageManagerDialog('edit', (data) => {
          item.object_img_url = data[0].url
          item.object_img = data[0].name
          item.img_width = data[0].width
          item.img_height = data[0].height
        })
      },
      closeImgManager () {
        this.showImageManager = false
      }
    },
    components: {
      PreviewContainer, ModuleList, TimelineEdit, ImageManager
    }
  }
</script>
