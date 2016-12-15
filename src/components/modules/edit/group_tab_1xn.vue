<template>
  <div class="group-tab-box clearfix" v-show="show">
    <div class="goods-tab-title">
      <ul>
        <li id="{{ds_timeline_id}}-{{tab.group_id}}" :class="{'active':tab.group_id == groupId}" v-for="tab in meta" @click.stop="changeActive(tab.group_id, $event)" v-if="tab.status == 1">{{tab.name}}</li>
      </ul>
    </div>
    <div class="clearfix"></div>
    <div class="clearfix img-component-data" v-show="show">
        <div class="rows">
            <ul class="flex-box list-title clearfix">
              <li>#</li>
              <li>图片</li>
              <li>商品ID</li>
              <li>商品名称</li>
              <li v-if="$root.buId == 1">筛选条件</li>
              <li>操作</li>
            </ul>
            <div class="rows item-box">
              <ds-item v-if="item != null && item.group_id == groupId" :item.sync="item" :index="$index" v-for="item of source"></ds-item>
            </div>
        </div>
      <ds-operate :source-data.sync="source" :ds_timeline_id="ds_timeline_id"></ds-operate>
    </div>
  </div>
</template>
<style lang="scss" scoped>
    .btn-wrap {
      float: right;
      margin-top: 10px;
      margin-right: 10px;
    }
    .group-tab-box {
      clear: both;
      background: #fff;
      .goods-tab-title {
        border-bottom: solid 1px #d0d0d0;
        ul {
          display: --webkit-flex;
          display: flex;
          width: 50%;
          box-sizing: border-box;
  -webkit-align-items: center;
          align-items: center;
          padding-left: 0;
          margin-left: 0;
          li {
    -webkit-flex: 1;
            flex: 1;
            text-align: center;
            cursor: pointer;
            padding: 10px;
            &.active {
              border-bottom: solid 4px #204d74;
              margin-bottom: -1px;
            }
          }
        }
      }
    }
    .list-title li {
      &:nth-child(3) {
        -webkit-flex: 2;
        flex: 2;
      }
      &:nth-child(4) {
        -webkit-flex: 4;
        flex: 4;
      }
      &:nth-child(5) {
        -webkit-flex: 3;
        flex: 3;
      }
      &:nth-child(6) {
        -webkit-flex: 1;
        flex: 1;
      }
    }
</style>
<script>
  import $ from 'jquery';
  import DsItem from '../../../components/cms/DsItem';
  import DsOperate from '../../../components/cms/DsItemOperating';
  import {pageAction, pageModuleAction}from '../../../vuex/actions';
  import {pageGetter}from '../../../vuex/getters';
  export default {
    vuex: {
      actions: {
        setCurrentGroupId: pageModuleAction.setCurrentGroupId
      },
      getters: {
        currentPageModule: pageGetter.getCurrentPageModule,
        currentGroupId: pageGetter.getCurrentGroupId
      }
    },
    props: {
      ds_timeline_id: '',
      source: {
        type: Array,
        default: () => {
          return [];
        },
        twoWay: true
      },
      show: false
    },
    data() {
      return {
        meta: this.currentPageModule['meta'] || [],
        groupId: 0
      }
    },
    methods: {
      changeActive(group_id, e) {
        this.groupId = group_id;
      },
      setActive() {
        let groupId = '';
        for (let i = 0, len = this.meta.length; i < len; i++) {
          if (this.meta[i].status) {
            groupId = this.meta[i].group_id;
            this.changeActive(groupId);
            return groupId;
          }
        }
      }
    },
    watch: {
      groupId() {
        this.setCurrentGroupId(this.groupId)
      },
      currentPageModule: {
        handler: function () {
          this.meta = this.currentPageModule['meta'];
          this.setActive();
        },
        deep: true
      },
      show() {
        //每次打开时间轴重置默认Tab页
        this.setActive();
      }
    },
    components: {
      DsItem, DsOperate
    },
    ready() {
      this.groupId = this.setActive();
    }
  }
</script>
