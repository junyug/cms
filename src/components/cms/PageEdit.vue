<template>
  <section id="pageedit">
    <image-manager v-if="timelineShow && showImageManager" :showModal="showImageManager" :callback="callback" @closeImgManager="closeImgManager" :operate="operate"></image-manager>
    <url-dialog v-if="timelineShow && showUrl" :dsItem="dsItem" :showModal="showUrl" @closeUrlDialog="closeUrlDialog"></url-dialog>
    <el-row type="flex" justify="center" align="top">
      <el-col class="wrap-container">
        <section class="preview-box">
          <preview-container @switchBox="switchBox"></preview-container>
        </section>
      </el-col>
      <el-col class="bg-purple">
        <section :class="['main-editor-box', {'main-box-fixed': isFixed}]">
          <module-list v-if="modulesShow"></module-list>
          <timeline-edit v-if="timelineShow" :isFixed="isFixed"></timeline-edit>
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
      background: #e5e9f2;
      box-sizing: border-box;
      margin: 0 10px;
      &.main-box-fixed {
        position: fixed;
        top: 0;
        left: 320px;
        padding-left: 10px;
        overflow: auto;
      }
    }
  }
</style>
<script>
  import PreviewContainer from './PreviewContainer'
  import ModuleList from './ModuleList'
  import TimelineEdit from './TimelineEdit'
  import ImageManager from '../common/ImageManager'
  import UrlDialog from '../common/UrlDialog'
  export default {
    name: 'pageEdit',
    data () {
      return {
        bodyEl: '',
        pageEl: '',
        fixEl: '',
        isFixed: false,
        modulesShow: true,
        timelineShow: false,
        showImageManager: false,
        showUrl: false,
        operate: 'add',
        callback: () => {},
        dsItem: {},
        ticking: false  // rAF 触发锁
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
      },
      closeUrlDialog () {
        this.showUrl = false
      },
      onScroll () {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.fixedFunc()
            this.ticking = false
          })
          this.ticking = true
        }
      },
      fixedFunc () {
        let scrollTop = this.bodyEl.scrollTop
        let docH = document.documentElement.clientHeight
        let pageH = this.pageEl.offsetHeight
        if (scrollTop > 50) {
          this.fixEl.style.height = docH - 20 + 'px'
          this.isFixed = true
          if (pageH <= docH) {
            this.pageEl.style.height = docH + 60 + 'px'
            this.bodyEl.scrollTop = 52
          }
        } else {
          this.isFixed = false
        }
      }
    },
    components: {
      PreviewContainer, ModuleList, TimelineEdit,
      ImageManager, UrlDialog
    },
    mounted () {
      this.bodyEl = document.querySelector('body')
      this.pageEl = document.querySelector('#pageedit')
      this.fixEl = document.querySelector('.main-editor-box')
      window.addEventListener('scroll', this.onScroll, false)
    }
  }
</script>
