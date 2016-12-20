<template>
  <div class="edit-component">
    <span class="component-name" v-show="!showForm">{{module.name}}</span>
    <div v-show="isEdit">
      <a class="btn-delete"><i class="el-icon-circle-close"></i></a>
      <a class="center btn-edit" @click="show">
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
      show () {
        this.showForm = true
      },
      cancel () {
        this.showForm = false
      },
      submit () {
        console.log(this.component)
      }
    }
  }
</script>
