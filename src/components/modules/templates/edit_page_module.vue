<template>
  <div class="clearfix">
    <span class="component-name"  @click.stop="showname" v-show="!editname" v-if="module.name">{{module.name}}</span>
    <span class="edit-icon" @click.stop="showname" v-show="!editname">
      <i class="edit-icon"></i>
    </span>
      <div v-show="editname" class="edit-component-name-con" style="padding:5px;">
          <div class="form-inline">
              <input type="text" value={{module.name}} placeholder="模块名称" class="form-control" style="width: 120px; ">
              <button @click="saveModuleName" class="btn btn-sm btn-primary">保存</button>
              <button @click="cancelUpdateModuleName" class="btn btn-sm btn-default">取消</button>
          </div>
      </div>
  </div>
</template>
<style lang="scss">
    .edit-icon{
        cursor: pointer;
        background: url(../assets/image/edit-icon.png) no-repeat 0 0;
        background-size:100%;
        width:40px;
        height:40px;
    }
    .component-name {
        position: absolute;
        left: -1px;
        top: 2px;
        background: rgba(4, 4, 4, 0.5);
        padding: 2px 10px;
        color: #fff;
        font-size: 12px;
    }
</style>
<script>
  import {pageAction,pageModuleAction} from '../vuex/actions';
  import {pageGetter} from '../vuex/getters';
  import imageOneOne from '../assets/tpl-image/image1x1.png';

  import {Toast} from '../funs/toast';
  import $ from 'jquery';

  export default {
    vuex: {
      actions: {
        updateModuleById:pageModuleAction.updateModuleById,
      }
    },
    props: {
      module: {}
    },
    data() {
          return {
            editname:false,
          }
    },
    events:{
        'leave-component':function(){
             this.editname = false;
        }
    },
    methods: {
        showname(){
           this.editname = true;
        },
        cancelUpdateModuleName(){
           this.editname = false;
        },
        saveModuleName(e){
            var name = $(e.currentTarget).closest('.edit-component-name-con').find('input').val();
            this.updateModuleById({id:this.module.id,name:name},(res)=>{
                this.module.name = name;
                Toast.success('保存成功');
                this.editname = false;
            });
        },

        previewComponent() {
          this.cancelUpdateModuleName();
        }
      },
      components:{

      },
      ready() {

      }
  }
</script>
