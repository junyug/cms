<template>
  <el-dialog :title='title' v-model="dialogVisible" @close="closeDialog">
    <el-form :model="params" label-width="120px" class="dialog-content">
      <el-form-item label="源ID">
        <el-input :disabled="true" size="small" v-model="params.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="克隆到">
        <el-checkbox-group v-model="checkedCityList">
          <el-checkbox v-for="city of citys" :label="city.id">{{city.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="页面类型">
        <el-select v-model="pageType">
          <el-option v-for="type of types" :label="type.name" :value="type.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面结构">
        <el-radio-group v-model="pageStruct">
          <el-radio v-for="struct of structs" :label="struct.id">{{struct.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">完成</el-button>
    </div>
  </el-dialog>
</template>
<style lang='scss'>
  .dialog-content {
    .el-form-item {
      margin-bottom: 10px;
      .el-input {
        width: 400px;
      }
      .el-select {
        width: 400px;
      }
    }
  }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import {Notification} from 'element-ui'
  export default {
    name: 'cloneDialog',
    props: {
      title: '',
      showEdit: false,
      pageId: 0
    },
    data () {
      return {
        checkedCityList: [],
        pageType: 2,
        pageStruct: 1
      }
    },
    computed: {
      ...mapGetters({
        citys: types.CITY_LIST,
        types: types.TYPE_LIST,
        structs: types.STRUCT_LIST
      }),
      dialogVisible () {
        return this.showEdit
      },
      params () {
        return {
          id: this.pageId,
          citys: this.checkedCityList.join(','),
          page_type: this.pageType,
          page_struct: this.pageStruct
        }
      }
    },
    methods: {
      ...mapActions({
        setCityList: types.SET_CITY_LIST,
        setTypeList: types.SET_TYPE_LIST,
        clone: types.CLONE_PAGE
      }),
      closeDialog () {
        this.$emit('close', false)
      },
      submit () {
        this.clone({
          data: this.params,
          callback: (res) => {
            Notification.success({title: '提示', message: '页面克隆成功'})
            this.closeDialog()
          }
        })
      }
    },
    created () {
      this.setCityList({
        data: {},
        callback: (res) => {
        }
      })
      this.setTypeList({
        data: {},
        callback: (res) => {
        }
      })
    }
  }
</script>
