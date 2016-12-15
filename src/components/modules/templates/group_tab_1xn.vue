<template>
    <div class="component-good-tab" :class='{"edit": isEdit, "preview": isPreview}' @click="editComponent($event)">
      <span class="component-name" v-show="!editModule" v-if="module.name">{{module.name}}</span>
      <span class="edit-icon" @click.stop="showDialog" v-show="!editModule">
        <i class="edit-icon"></i>
      </span>
      <a class="btn-delete" @click.stop="deleteComponent"></a>
      <div class="img-item">
        <img :src="imgUrl">
      </div>
    </div>
</template>
<script>
  import {Toast} from '../funs/toast';
  import {pageAction, pageModuleAction} from '../vuex/actions';
  import {pageGetter} from '../vuex/getters';
  import previewImage from '../assets/tpl-image/group_tab_1xn.png';

  export default {
    vuex: {
      actions: {
        getPageModule: pageModuleAction.getById,
        setCurrentPageModule: pageModuleAction.setCurrentPageModule,
        setPageModuleData: pageModuleAction.setPageModuleData,
        removePageModule: pageModuleAction.removePageModule
      }
    },
    props: {
      hideEdit: false,
      module: {}
    },
    data() {
          return {
            imgUrl:previewImage,
            isEdit: false,
            isPreview: true,
            editModule: false
          }
    },
    watch: {
      hideEdit() {
        this.editModule = this.hideEdit;
      }
    },
      methods: {
        showDialog(){
          this.editModule = true;
          this.$parent.showDialog(this.editModule, this.module);
        },
        editComponent() {
          if (this.isEdit) return;
          this.isEdit = true;
          this.isPreview = false;
          //设置当前操作的pageModule
          this.getPageModule({id: this.module.id}, (res) => {
            if (res.ret == 1) {
              this.module = res.data;
              this.setPageModuleData({page_module_id: this.module.id}, (res) => {
                if (res.ret == 1) {
                  this.setCurrentPageModule(this.module);
                  //将当前编辑的组件派发出去
                  this.$dispatch('set-edit-component', {'component': this.module.id});
                  this.$dispatch('box-switch', 'editor');
                  setTimeout(() => {
                    this.$dispatch('change-editor-title',this.module.module.type);
                    this.$dispatch('show-first-dstimeline');
                  },100)
                  this.$dispatch('form-show', false);
                } else {
                  this.isEdit = false;
                  this.isPreview = true;
                  Toast.error(res.error);
                }
              });
            } else {
              Toast.error(res.error);
            }
          })
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
