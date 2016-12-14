<template>
  <section id='pagelist'>
    <page-info-dialog :title='dialogTitle' :showEdit="showEdit" :page="pageData" @close="close"></page-info-dialog>
    <el-tabs :active-name='$route.params.type' class="nav-tabs" type="card" @tab-click="handleTabClick">
      <el-tab-pane label='固定页面' name="1"></el-tab-pane>
      <el-tab-pane label='活动页面' name="2"></el-tab-pane>
      <el-tab-pane label='其他页面' name="3"></el-tab-pane>
      <el-tab-pane v-if='$root.buId == 2' label="集市" name="4"></el-tab-pane>
    </el-tabs>
    <el-row class='top-bar' type="flex" justify="end" align="middle">
      <el-col :span='4'>
        <el-input size='small' placeholder="搜索页面" icon="search" v-model.lazy="params.name"></el-input>
      </el-col>
      <el-col class='btn-create-box'>
        <el-button type='primary' @click="edit(initPage)">新建页面</el-button>
      </el-col>
    </el-row>
    <el-table :data='list'>
      <el-table-column prop='id' label="页面ID"></el-table-column>
      <el-table-column prop='name' label="页面名称"></el-table-column>
      <el-table-column prop='remark' label="备注"></el-table-column>
      <el-table-column inline-template label='过期时间'>
        <span>{{row.end_time*1000|date('%F %T')}}</span>
      </el-table-column>
      <el-table-column inline-template label='操作' align="center" width="360">
        <span class='opera-box'>
          <button type='button' @click="edit(row)">
            <i class='el-icon-edit'></i>
            <span>编辑</span>
          </button>
          <button type='button' @click="clone(row.id)">
            <i class='fa fa-copy'></i>
            <span>克隆页面</span>
          </button>
          <button :text="row.id" type="button" class="btn-copyurl">
            <i class='fa fa-link'></i>
            <span>复制URL</span>
          </button>
          <button type='button' :class="{'btn-danger': parseInt(row.status),'btn-success': !parseInt(row.status)}" @click="statusChange(row.id, row.status)">
            <i class='fa fa-arrow-down' v-if="row.status == 1"></i><span v-if="row.status == 1">下线</span>
            <i class='fa fa-arrow-up' v-if="row.status == 0"></i><span v-if="row.status == 0">上线</span>
          </button>
        </span>
      </el-table-column>
    </el-table>
    <el-pagination v-show='total > 0' class="pagination"
      layout='prev, pager, next'
      :total='total'
      :current-page='currentPage'
      :page-size='params.size'
      @current-change='handleCurrentChange'>
    </el-pagination>
  </section>
</template>
<style lang='scss' scoped>
  #pagelist {
    padding: 10px 20px;
    .dialog-content {
      .el-input {
        width: 400px;
      }
    }
    .opera-box {
      button {
        -webkit-flex: 1;
        flex: 1;
        box-sizing: border-box;
        background: none;
        padding: 8px 15px;
        border: none;
        color: #8492A6;
        i,span {
          display: block;
          text-align: center;
          padding: 0;
          font-size: 12px;
        }
        &:hover {
          background: #E5E9F2;
          color: #1D8CE0;
        }
      }
    }
    .nav-tabs {
      width: 100%;
    }
    .top-bar {
      margin-bottom: 15px;
      .btn-create-box {
        width: auto;
        margin-left: 5px;
        text-align: right;
      }
    }
    .pagination {
      margin-top: 10px;
      text-align: right;
    }
  }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import Clipboard from 'clipboard'
  import {Notification} from 'element-ui'
  import PageInfoDialog from './PageInfoDialog'
  export default {
    name: 'pageList',
    data () {
      return {
        total: 0,
        dialogTitle: '',
        showEdit: false,
        currentPage: 1,
        pageData: { },
        initPage: {
          'id': 0,
          'name': '',
          'keyword': '',
          'remark': '',
          'type': this.$route.params.type,
          'is_share': 0,
          'share_name': '',
          'share_img': '',
          'share_img_url': '',
          'share_url': '',
          'share_desc': '',
          'start_time': Math.floor(new Date().getTime() / 1000),
          'end_time': Math.floor((new Date('2038/01/01').getTime()) / 1000)
        },
        params: {
          type: '0',
          name: '',
          page: 1,
          size: 16
        },
        clipboard: null
      }
    },
    computed: {
      // 对象展开运算符,将本地computed对象与mapState对象合并后返回computed对象
      ...mapGetters({
        list: types.GET_LIST
      })
    },
    methods: {
      ...mapActions({
        setList: types.SET_PAGE_LIST,
        update: types.UPDATE_PAGE
      }),
      close (val) {
        this.showEdit = val
      },
      clone (sourceId) {
        console.log(sourceId)
      },
      edit (page) {
        this.dialogTitle = '新建页面'
        this.showEdit = true
        this.pageData = page
      },
      statusChange (pageId, status) {
        status = status == 0 ? 1 : 0
        this.update({
          data: {id: pageId, status: status},
          callback: (res) => {
            let toastInfo = status == 1 ? res.name + '已上线' : res.name + '已下线'
            Notification.success({title: '提示', message: toastInfo})
          }
        })
      },
      updatePageList () {
        this.setList({
          data: this.params,
          callback: (res) => {
            this.total = +res.total
          }
        })
      },
      handleCurrentChange (val) {
        this.params.page = this.currentPage = val
      },
      handleTabClick (tab, event) {
        this.$router.push({name: 'pagelist', params: {type: tab.name}})
      }
    },
    watch: {
      '$route': {
        handler () {
          this.params.type = this.$route.params.type
          this.initPage.type = this.$route.params.type
          this.params.page = 1
        },
        deep: true
      },
      'params': {
        handler () {
          this.updatePageList()
        },
        deep: true
      }
    },
    components: {
      PageInfoDialog
    },
    created () {
      // 初始化页面类型
      this.params.type = '' + this.$route.params.type
      // 复制url地址功能
      this.clipboard = new Clipboard('.btn-copyurl', {
        text: function (trigger) {
          let url = trigger.getAttribute('text')
          Notification.success('url复制成功!')
          return 'http://meixian.hezu.us/index/cms?id=' + url
        }
      })
    },
    destroyed () {
      this.clipboard.destroy()
    }
  }
</script>
