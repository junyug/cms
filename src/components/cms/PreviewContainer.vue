<template>
 <div class="wrapper">
    <div class="preview-container" >
      <div class="components-box">
        <div :class="['component-item-box', {'edit': activeId == module.id}]"
          v-for="(module, index) of applyModules"
          v-draggable:y="{index: index, dragged: 'dragged', 'module': module}"
          v-dropzone:y="{index: index, handler: sort}"
          v-dropzone:x="{index: index, handler: copy}"
          @click.stop="editComponent(module)"
        >
          <empty v-if="module.module.template_code == 'template_empty'"></empty>
          <slide :id="activeId" :module="module" v-if="module.module.template_code == 'slide'"></slide>
          <icon-1x4 :id="activeId" :module="module" v-if="module.module.template_code == 'icon_1x4'"></icon-1x4>
          <img-1xn :id="activeId" :module="module" v-if="module.module.template_code == 'img_1xn'"></img-1xn>
          <img-2xn :id="activeId" :module="module" v-if="module.module.template_code == 'img_2xn'"></img-2xn>
          <img-3xn :id="activeId" :module="module" v-if="module.module.template_code == 'img_3xn'"></img-3xn>
          <img-2xnx1 :id="activeId" :module="module" v-if="module.module.template_code == 'img_2xn_1'"></img-2xnx1>
          <img-1xnx3 :id="activeId" :module="module" v-if="module.module.template_code == 'img_1xnx3'"></img-1xnx3>
          <good-1xn :id="activeId" :module="module" v-if="module.module.template_code == 'goods_1xn'"></good-1xn>
          <good-2xn :id="activeId" :module="module" v-if="module.module.template_code == 'goods_2xn'"></good-2xn>
          <good-3xn :id="activeId" :module="module" v-if="module.module.template_code == 'goods_3xn'"></good-3xn>
          <group-tab-1xn :id="activeId" :module="module" v-if="module.module.template_code == 'group_tab_1xn'"></group-tab-1xn>
          <group-seckill-1xn :id="activeId" :module="module" v-if="module.module.template_code == 'group_seckill_1xn'"></group-seckill-1xn>
          <txt :id="activeId" :module="module" v-if="module.module.template_code == 'text'"></txt>
          <text-title-1 :id="activeId" :module="module" v-if="module.module.template_code == 'text_title_1'"></text-title-1>
          <popup :id="activeId" :module="module" v-if="module.module.template_code == 'popup'"></popup>
        </div>
      </div>
      <div class="add-btn-con">
        <el-button type="success" @click.stop="showModuleBox">添加模块</el-button>
      </div>
    </div>
     <div class="bottom"></div>
 </div>
</template>
<style lang="scss">
  .wrapper {
    background: url('../../assets/image/p1.png') no-repeat 0 0;
    margin-top: 10px;
    padding-top: 89px;
    margin-left: 0;
    background-size: 100% auto;
  }
  .bottom {
    background: url('../../assets/image/p3.png') no-repeat top left;
    height: 121px;
    width: 100%;
    background-size: 100% auto;
  }
  .preview-container {
    min-height: 300px;
    padding: 0px 40px 0 43px;
    background: #fff url('../../assets/image/p2.png') repeat-y 0 0;
    background-size: 100% auto;
    .add-btn-con {
      padding: 10px 0;
      text-align: center;
      button {width: 80%;}
    }
    .components-box {
      width: 248px;
      max-width: 248px;
    }
    .component-item-box {
      position: relative;
      background: #e5e9f2;
      margin-bottom: 5px;
      position: relative;
      .component-name {
        position: absolute;
        z-index: 2;
        left: 0;
        top: 2px;
        background: rgba(4,4,4,.5);
        padding: 2px 10px;
        color: #fff;
        font-size: 12px;
      }
      .el-form-item {
        margin-bottom: 0;
        margin-right: 0;
        .el-input--small {
          width: 148px;
          display: inline-block;
        }
        .el-button {
          margin-left: 0;
        }
      }
      &.edit {
        border: 2px dashed #FF4949;
        a {
          cursor: pointer;
          position: absolute;
        }
      }
      .btn-delete {
        color: #FF4949;
        top: -10px;
        right: -10px;
      }
      .btn-edit {
        background: #FF4949;
        border-radius: 100%;
        color: #F9FAFC;
        font-size: 12px;
        padding: 8px;
        text-align: center;
        span {
          padding: 2px;
          display: block;
        }
      }
      img {
        width: 100%;
      }
    }
  }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import Empty from '../modules/templates/empty'
  import Slide from '../modules/templates/slide'
  import Icon1x4 from '../modules/templates/icon_1x4'
  import Img1xn from '../modules/templates/img_1xn'
  import Img2xn from '../modules/templates/img_2xn'
  import Img3xn from '../modules/templates/img_3xn'
  import Img2xnx1 from '../modules/templates/img_2xn_1'
  import Img1xnx3 from '../modules/templates/img_1xnx3'
  import Good1xn from '../modules/templates/goods_1xn'
  import Good2xn from '../modules/templates/goods_2xn'
  import Good3xn from '../modules/templates/goods_3xn'
  import Txt from '../modules/templates/text'
  import TextTitle1 from '../modules/templates/text_title_1'
  import Popup from '../modules/templates/popup'
  import GroupTab1xn from '../modules/templates/group_tab_1xn'
  import GroupSeckill1xn from '../modules/templates/group_seckill_1xn'
  export default {
    name: 'previewContainer',
    data () {
      return {
        activeId: 0
      }
    },
    computed: {
      ...mapGetters({
        modules: types.MODULE_LIST,
        applyModules: types.APPLY_MODULE_LIST,
        operateModule: types.OPERATE_MODULE
      })
    },
    watch: {
      applyModules: {
        handler () {
          if (this.applyModules.length == 1 && this.applyModules[0].id == -1) {
            this.showModuleBox()
          }
        },
        deep: true
      },
      operateModule: {
        handler () {
          if (Object.keys(this.operateModule).length == 0) {
            this.showModuleBox()
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapActions({
        applyModuleList: types.SET_APPLY_MODULE_LIST,
        sortModuleList: types.SORT_MODULES,
        addModule: types.ADD_MODULE,
        setOperateModule: types.SET_OPERATE_MODULE,
        setTimelineList: types.SET_MODULE_TIMELINE_LIST
      }),
      showModuleBox () {
        this.activeId = 0
        this.$emit('switchBox', {modulesShow: true, timelineShow: false})
      },
      editComponent (module) {
        if (this.activeId == module.id) return
        if (module.id != -1) {
          this.activeId = module.id
          this.setOperateModule({
            data: {id: module.id},
            callback: (data) => {
              this.setModuleData(data.id)
            }
          })
        }
      },
      setModuleData (pageModuleId) {
        this.setTimelineList({
          data: {page_module_id: pageModuleId},
          callback: (data) => {
            this.$emit('switchBox', {modulesShow: false, timelineShow: true})
          }
        })
      },
      copy (targetIndex, data) {
        let pageModule = {}
        pageModule['module'] = data.module
        this.addModule({
          data: {
            page_id: this.$route.params.id,
            module_id: data.module.id,
            module_index: targetIndex
          },
          callback: (res) => {
            // 插入新module重新排序
            this.sortModules()
          }
        })
      },
      sort (targetIndex, data) {
        let list = this.applyModules
        if (data.module.id == '-1') return
        let module = list[data.index]
        // 此处dragend事件会触发失效，要采用异步的方式排序
        setTimeout(() => {
          list.splice(data.index, 1)
          data.index < targetIndex ? list.splice(targetIndex - 1, 0, module) : list.splice(targetIndex, 0, module)
          this.sortModules()
        }, 100)
      },
      sortModules () {
        let sortIds = []
        this.applyModules.forEach((module, index) => {
          sortIds.push(module.id)
        })
        this.sortModuleList({
          data: {'sort_ids': sortIds.join(',')},
          callback: (res) => {}
        })
      }
    },
    components: {
      Slide, Empty, Icon1x4, Popup,
      Img1xn, Img2xn, Img3xn, Img2xnx1, Img1xnx3,
      Good1xn, Good2xn, Good3xn,
      Txt, TextTitle1,
      GroupTab1xn, GroupSeckill1xn
    },
    created () {
      let pageId = this.$route.params.id
      this.applyModuleList({
        data: {page_id: pageId},
        callback: (res) => {}
      })
    }
  }
</script>
