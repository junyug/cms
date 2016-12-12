<template>
  <el-dialog :title='title' v-model="dialogVisible" @close="closeDialog">
    <el-form :model="page" label-width="120px" class="dialog-content">
      <el-form-item label="ID">
        <el-input :disabled="true" size="small" v-model="page.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input size="small" v-model="page.name" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">完成</el-button>
    </div>
  </el-dialog>
</template>
<style lang='scss' scoped>
  .dialog-content {
    .el-input {
      width: 400px;
    }
  }
</style>
<script>
  import {mapActions} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import defaultIcon from '../../assets/image/icon-default.png'
  export default {
    name: 'pageInfoDialog',
    props: {
      title: '',
      showEdit: false,
      page: { }
    },
    computed: {
      dialogVisible () {
        return this.showEdit
      }
    },
    methods: {
      ...mapActions({
        add: types.ADD_PAGE,
        update: types.UPDATE_PAGE
      }),
      closeDialog () {
        this.$emit('close', false)
      },
      createPage () {
        if (this.page.share_img == defaultIcon) {
          this.page.share_img = ''
          this.page.share_img_url = ''
        }
        this.add({
          data: this.page,
          callback: (res) => {
            this.$router.go({name: 'pageedit', params: {pageId: res.data.id}})
            this.showEdit = false
          }
        })
      },
      editPage () {
        this.update({
          data: this.page,
          callback: (res) => {
            this.page = res.data
            this.showEdit = false
          }
        })
        console.log('update')
      },
      submit () {
        if (this.page.id == 0) {
          this.createPage()
        } else {
          this.editPage()
        }
      }
    }
  }
</script>
