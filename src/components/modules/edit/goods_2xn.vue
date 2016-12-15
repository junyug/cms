<template>
<div class="clearfix">
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
            <ds-item v-if="item != null" :item.sync="item" :index="$index" v-for="item of source"></ds-item>
          </div>
      </div>
      <ds-operate :source-data.sync="source" :ds_timeline_id="ds_timeline_id"></ds-operate>
  </div>
</div>
</template>
<style lang="scss" scoped>
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
  .btn-wrap {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
  }
</style>
<script>
  import DsItem from '../../../components/cms/DsItem';
  import DsOperate from '../../../components/cms/DsItemOperating';
   export default {
      props: {
        ds_timeline_id: '',
        source: {
          type: Array,
          default: () => {
            return [];
          },
          twoWay: true
        },
        item: { },
        show: false
      },
      components: {
        DsItem, DsOperate
      }
    }
</script>
