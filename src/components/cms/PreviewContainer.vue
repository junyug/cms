<template>
 <div class="wrapper">
    <div class="preview-container" > <div class="components-box">
        <div class="component-item-box" v-for="(module, index) of applyModules"
          v-draggable:y="{index: index, dragged: 'dragged', 'module': module}"
          v-dropzone:y="{index: index, handler: sort}"
        >
          <empty v-if="module.module.template_code == 'template_empty'"></empty>
          <slide v-if="module.module.template_code == 'slide'"></slide>
          <icon-1x4 v-if="module.module.template_code == 'icon_1x4'"></icon-1x4>
          <img-1xn v-if="module.module.template_code == 'img_1xn'"></img-1xn>
          <img-2xn v-if="module.module.template_code == 'img_2xn'"></img-2xn>
          <img-3xn v-if="module.module.template_code == 'img_3xn'"></img-3xn>
          <img-2xn_1 v-if="module.module.template_code == 'img_2xn_1'"></img-2xn_1>
          <img-1xnx3 v-if="module.module.template_code == 'img_1xnx3'"></img-1xnx3>
          <good-1xn v-if="module.module.template_code == 'goods_1xn'"></good-1xn>
          <good-2xn v-if="module.module.template_code == 'goods_2xn'"></good-2xn>
          <good-3xn v-if="module.module.template_code == 'goods_3xn'"></good-3xn>
          <group-tab-1xn v-if="module.module.template_code == 'group_tab_1xn'"></group-tab-1xn>
          <group-seckill-1xn v-if="module.module.template_code == 'group_seckill_1xn'"></group-seckill-1xn>
          <text v-if="module.module.template_code == 'text'"></text>
          <text-title-1 v-if="module.module.template_code == 'text_title_1'"></text-title-1>
        </div>
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
    .components-box {
      width: 248px;
      overflow: hidden;
    }
    .component-item-box {
      background: #e5e9f2;
      margin-bottom: 5px;
      position: relative;
      overflow: hidden;
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
  import Text from '../modules/templates/text'
  import TextTitle1 from '../modules/templates/text_title_1'
  import Popup from '../modules/templates/popup'
  import GroupTab1xn from '../modules/templates/group_tab_1xn'
  import GroupSeckill1xn from '../modules/templates/group_seckill_1xn'
  export default {
    name: 'previewContainer',
    data () {
      return {
        showModule: false
      }
    },
    computed: {
      ...mapGetters({
        modules: types.MODULE_LIST,
        applyModules: types.APPLY_MODULE_LIST
      })
    },
    methods: {
      ...mapActions({
        applyModuleList: types.SET_APPLY_MODULE_LIST,
        sortModuleList: types.SORT_MODULES
      }),
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
      Text, TextTitle1,
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
