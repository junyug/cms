<template>
  <div class="edit-component">
    <span class="component-name" v-show="!showForm && module.name">{{module.name}}</span>
    <div v-show="isEdit">
      <a class="btn-delete" @click="deleteModule"><i class="el-icon-circle-close"></i></a>
      <a class="center btn-edit" @click.stop="show">
        <i class="el-icon-edit"></i>
        <span>编辑</span>
      </a>
      <div class="edit-component-box" v-show="isEdit && showForm">
        <el-form :inline="true" :model="component">
          <el-form-item>
            <el-input size="small" v-model="component.name" placeholder="模块名称"></el-input>
            <el-button size="small" type="primary" @click.stop="submit">确定</el-button>
            <el-button size="small" @click.stop="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import * as types from '../../../vuex/mutation-types'
  import {mapActions} from 'vuex'
  export default {
    props: ['isEdit', 'module'],
    data () {
      return {
        showForm: false
      }
    },
    computed: {
      component () {
        return Object.assign({}, this.module)
      }
    },
    watch: {
      isEdit () {
        if (!this.isEdit) {
          this.showForm = false
        }
      }
    },
    methods: {
      ...mapActions({
        update: types.UPDATE_MODULE,
        deleteById: types.DELETE_MODULE
      }),
      show () {
        if (this.showForm) return
        this.showForm = true
      },
      cancel () {
        this.showForm = false
      },
      submit () {
        this.update({
          data: {id: this.component.id, name: this.component.name},
          callback: (data) => {
            this.showForm = false
          }
        })
      },
      deleteModule () {
        this.deleteById({
          data: {id: this.component.id},
          callback: (data) => {
            console.log(Object.assign({}, data))
          }
        })
      }
    }
  }
</script>
