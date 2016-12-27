<template>
  <el-dialog class="url-dialog-box" :title="title" v-model="show" @close="hide">
    <div class="url-dialog dialog-content">
      <el-tabs :active-name='params.urlType.toString()' type="card" @tab-click="changeType">
        <el-tab-pane label="页面链接" name="1">
          <div class="search-box-wrapper">
            <el-input icon="search" placeholder="搜索页面..." v-model.lazy="params.name"></el-input>
          </div>
          <el-table :data="pageList" highlight-current-row @current-change="select">
            <el-table-column prop="id" label="页面ID"></el-table-column>
            <el-table-column prop="name" label="页面名称"></el-table-column>
            <el-table-column prop="remark" label="页面备注"></el-table-column>
            <el-table-column label="过期时间" inline-template>
              <span>{{row.end_time * 1000|date('%F %T')}}</span>
            </el-table-column>
          </el-table>
          <el-pagination v-show='totalPage > 0' class="pagination"
            layout='prev, pager, next'
            :page-count='totalPage'
            :current-page='curPage'
            :page-size='params.size'
            @current-change="pageChange"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="2">
          <div class="good-detail">
            <el-form :model="good" label-width="80px">
              <el-form-item label="选择区域" v-if="$root.buId == 2">
                <el-select v-model="defaultAreaId">
                  <el-option v-for="area of areaList" :value="area.id" :label="area.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品ID">
                <el-input type="text" v-model.lazy="good.id" @keyup.13.native="getGood"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="text-show">{{good.name}} {{good.format}}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品分类" name="3">
          <div class="good-class-box">
            <el-form label-width="80px">
              <el-form-item label="选择区域" v-if="$root.buId == 2">
                <el-select v-model="defaultAreaId">
                  <el-option v-for="area of areaList" :value="area.id" :label="area.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择分类">
                <el-select class="form-control" v-model="class1Id">
                  <el-option v-for="item of class1List" :value="item.id" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select class="form-control" v-model="class2Id">
                  <el-option v-for="item of class2List" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="自定义URL" name="4">
          <div class="custom-url">
            <el-form :model="dsItem" label-width="80px">
              <el-form-item label="h5URL">
                <el-input type="text" v-model.lazy="dsItem.h5_url"></el-input>
              </el-form-item>
              <el-form-item label="appURL">
                <el-input type="text" v-model.lazy="dsItem.app_url"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div slot="footer" class="clearfix">
      <el-button type="success" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<style lang="scss">
  .url-dialog-box {
    .el-dialog--small {
      width: 50%;
    }
    .el-dialog__body {
      padding-bottom: 0;
    }
  }
  .url-dialog {
    .search-box-wrapper {
      width: 320px;
      float: right;
      margin-bottom: 10px;
    }
    .el-tabs {
      width: 100%;
    }
    .good-detail {
      width: 600px;
      margin: 0 auto;
      .text-show {
        color: #20A0FF;
      }
    }
    .good-class-box, .custom-url {
      width: 600px;
      margin: 0 auto;
    }
    .pagination {
      text-align: right;
      margin-top: 10px;
    }
  }
</style>
<script>
  import {mapActions} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import {Notification} from 'element-ui'
  export default {
    name: 'urlDialog',
    props: {
      showModal: false,
      dsItem: {}
    },
    computed: {
      show () {
        return this.showModal
      },
      h5Url () {
        return this.dsItem.h5_url || ''
      },
      appUrl () {
        return this.dsItem.app_url || ''
      }
    },
    data () {
      return {
        title: '选择URL',
        curPage: 1,
        totalPage: 0,
        defaultAreaId: -1,
        class1Id: -1,
        class2Id: -1,
        pageList: [],
        areaList: [],
        class1List: [],
        class2List: [],
        selectedId: 0,
        good: {
          id: '',
          name: '',
          format: ''
        },
        params: {
          type: '1,2,4',
          page: 1,
          name: '',
          urlType: 0,
          size: 20
        },
        url: {
          url_type: 1,
          url_id: '',
          url_name: ''
        }
      }
    },
    watch: {
      params: {
        handler () {
          if (this.params.urlType == 1) {
            this.updatePageList()
          }
        },
        deep: true
      },
      defaultAreaId () {
        this.setClass1List({
          data: {area_id: this.defaultAreaId},
          callback: (res) => {
            if (res.length) {
              this.class1Id = res[0].id
              this.class1List = res
            }
          }
        })
      },
      class1Id () {
        this.setClass2List({
          data: {area_id: this.defaultAreaId, class_id: this.class1Id},
          callback: (res) => {
            this.class2Id = res[0].id
            this.class2List = res
          }
        })
      },
      class2Id () {
        this.url.url_id = this.class1Id + '_' + this.class2Id
        let selectedClass = this.class2List.filter((value) => {
          return value.id == this.class2Id
        })
        selectedClass.length ? this.url.url_name = selectedClass[0].name : ''
      }
    },
    methods: {
      ...mapActions({
        setPageList: types.SET_PAGE_LIST,
        setSaleAreaList: types.SET_SALE_AREA_LIST,
        setClass1List: types.SET_CLASS1_LIST,
        setClass2List: types.SET_CLASS2_LIST,
        searchGoods: types.SEARCH_GOOD
      }),
      pageChange (pageIndex) {
        this.params.page = pageIndex
      },
      hide () {
        this.$emit('closeUrlDialog', false)
      },
      changeType (tab) {
        // 重置选择项、参数列表
        let type = tab.name
        this.params.urlType = type
        this.params.page = 1
        this.url.url_type = type
        this.url.url_id = ''
        this.url.url_name = ''
        this.good.id = ''
        this.good.name = ''
        this.good.format = ''
        if (type == 3) {
          // 设置默认选择的分类
          this.url.url_id = this.class1Id + '_' + this.class2Id
          let selectedClass = this.class2List.filter((value) => {
            return value.id == this.class2Id
          })
          selectedClass.length ? this.url.url_name = selectedClass[0].name : ''
        }
        if (type == 4) {
          // 设置默认自定义url
          this.dsItem['h5_url'] = this.h5Url
          this.dsItem['app_url'] = this.appUrl
        }
      },
      submitSearch (event) {
        this.params.name = event.target.value
        this.params.page = 1
        this.params.size = 20
      },
      getGood () {
        this.searchGoods({
          data: {area_id: this.defaultAreaId, name: this.good.id},
          callback: (res) => {
            if (res.length) {
              let data = res[0]
              this.good.id = data.id
              this.good.name = data.name
              this.good.format = data.format
              this.url.url_id = data.id
              this.url.url_name = data.name
            } else {
              Notification.warning({title: '提示', message: '该商品不存在'})
            }
          }
        })
      },
      select (page) {
        this.url.url_id = this.selectedId = page.id
        this.url.url_name = page.name
        Notification.success({title: '提示', message: '已选择' + page.name})
      },
      updatePageList () {
        this.setPageList({
          data: this.params,
          callback: (res) => {
            this.pageList = res.rows
            this.curPage = parseInt(res.page)
            this.totalPage = res.total_page
          }
        })
      },
      submit () {
        if (this.params.urlType == 4) {
          this.dsItem['h5_url'] = this.h5Url
          this.dsItem['app_url'] = this.appUrl
        }
        this.dsItem = Object.assign(this.dsItem, this.url)
        this.hide()
      }
    },
    mounted () {
      this.params.urlType = 1
      this.setSaleAreaList({
        data: {},
        callback: (res) => {
          this.areaList = res
          this.defaultAreaId = res[0].id
        }
      })
    }
  }
</script>
