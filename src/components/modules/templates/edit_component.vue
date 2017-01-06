<template>
  <div class="edit-component">
    <span class="component-name" v-show="!showForm && module.name">{{module.name}}</span>
    <div v-show="isEdit">
      <el-popover
        ref="pop"
        placement="top-end"
        width="160">
        <p>确定要删除该模块吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click.stop="cancelDel">取消</el-button>
          <el-button type="primary" size="mini" @click.stop="confirmDel">确定</el-button>
        </div>
        <a class="btn-delete" slot="reference"><i class="el-icon-circle-close"></i></a>
      </el-popover>
      <a class="center btn-edit" @click.stop="show">
        <i class="el-icon-edit"></i>
        <span>编辑</span>
      </a>
      <div class="edit-component-box" v-show="isEdit && showForm">
        <el-form v-if="moduleType != 7" :inline="true" :model="component">
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
      },
      moduleType () {
        return this.module.module.type
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
        if (this.moduleType == 7) {
          this.$parent.$parent.showGroupDialog()
        } else {
          if (this.showForm) return
          this.showForm = true
        }
      },
      cancelDel () {
        this.$refs.pop.showPopper = false
      },
      confirmDel () {
        this.deleteById({
          data: {id: this.component.id},
          callback: (data) => {
            this.$refs.pop.showPopper = false
          }
        })
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
      }
    }
  }
</script>
