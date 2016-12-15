<template>
 <div class="wrapper">
    <div class="preview-container" >
      <div class="components-box">
        <div class="component-item-box" v-for="(module, index) of applyModules"
          v-draggable:y="{index: index, dragged: 'dragged','module': module}"
          v-dropzone:y="sort(applyModules, index, $droptag, $dropdata)"
        >
          <empty v-if="module.module.template_code == 'template_empty'"></empty>
        </div>
      </div>
    </div>
     <div class="bottom"></div>
 </div>
</template>
<style lang="scss" scoped>
  .wrapper {
    background: url('../../assets/image/p1.png') no-repeat 0 0;
    margin-top: 10px;
    padding-top: 87px;
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
    padding: 0px 39px 0 43px;
    background: #fff url('../../assets/image/p2.png') repeat-y 0 0;
    background-size: 100% auto;
    .component-item-box {
      margin-bottom: 5px;
      position: relative;
      img {width: 100%}
    }
  }
  
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import {Notification} from 'element-ui'
  import Empty from '../modules/templates/empty'
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
        applyModuleList: types.SET_APPLY_MODULE_LIST
      }),
      sort (list, id, data) {
        if (data.module.id == '-1') return
        let module = list[data.index]
        // 此处dragend事件会触发失效，要采用异步的方式排序
        setTimeout(() => {
          list.splice(data.index, 1)
          data.index < id ? list.splice(id - 1, 0, module) : list.splice(id, 0, module)
          this.sortModules()
        }, 100)
      },
      sortModules () {
        let sortIds = []
        this.applyModules.forEach((module, index) => {
          sortIds.push(module.id)
        })
        this.sortPageModule({'sortIds': sortIds.join(',')}, (res) => {
          if (res.ret !== 1) {
            Notification.error({title: '提示', message: res.errori})
          }
        })
      }
    },
    components: {
      Empty
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
