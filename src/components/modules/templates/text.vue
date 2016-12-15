<template>
  <div class="component-text" v-bind:class='{"edit": isEdit, "preview": isPreview}' @click="editComponent">
    <edit-module :module="module"></edit-module>
    <a class="btn-delete" @click.stop="deleteComponent"></a>
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
  import {pageAction, pageModuleAction} from '../vuex/actions';
  import {pageGetter} from '../vuex/getters';
  import imageText from '../assets/tpl-image/text.png';
  import editModule from './edit_page_module';

  export default {
    vuex: {
      actions: {
        setPageModuleData: pageModuleAction.setPageModuleData,
        setCurrentPageModule: pageModuleAction.setCurrentPageModule,
        removePageModule: pageModuleAction.removePageModule
      }
    },
    props: {
      module: {}
    },
    data() {
        return {
          imgUrl: imageText,
          isEdit: false,
          isPreview: true
        }
    },
    methods: {
      editComponent() {
        if (this.isEdit) return;
        this.setPageModuleData({page_module_id: this.module.id}, (res) => {
          if (res.ret == 1) {
            this.isEdit = true;
            this.isPreview = false;
            //设置当前操作的pageModule
            this.setCurrentPageModule(this.module);
            //将当前编辑的组件派发出去
            this.$dispatch('set-edit-component', {'component': this.module.id});
            this.$dispatch('box-switch', 'editor');
            //this.$dispatch('close-all-dstimeline', 0);
            setTimeout(() => {
              this.$dispatch('change-editor-title',this.module.module.type);
              this.$dispatch('show-first-dstimeline');
            },100)
            this.$dispatch('form-show', false);
          }
        });
      },
      deleteComponent() {
        if (window.confirm('确定要删除该模块？')) {
          this.removePageModule({'id': this.module.id}, (res) => {
            this.setCurrentPageModule({});
            this.$dispatch('box-switch', 'modules');
          });
        }
      },
      previewComponent() {
        this.isEdit = false;
        this.isPreview = true;
        this.$broadcast('leave-component', this.module);
      }
    },
    components:{
      editModule
    },
    ready() {
      this.$on('set-preview-component', (data) => {
        if (data.component !== this.module.id) {
          this.previewComponent();
        }
      });
    }
  }
</script>
