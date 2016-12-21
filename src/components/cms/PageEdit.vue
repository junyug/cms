<template>
  <section id="pageedit">
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
  export default {
    name: 'pageEdit',
    data () {
      return {
        isFixed: false,
        modulesShow: true,
        timelineShow: false
      }
    },
    methods: {
      switchBox (value) {
        this.modulesShow = value.modulesShow
        this.timelineShow = value.timelineShow
      }
    },
    components: {
      PreviewContainer, ModuleList, TimelineEdit
    }
  }
</script>
