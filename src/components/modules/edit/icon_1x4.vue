<template>
  <div class="clearfix">
    <div class="clearfix"></div>
    <div class="clearfix img-component-data" v-show="show">
      <div class="rows">
          <ul class="flex-box list-title">
            <li>#</li>
            <li>图片</li>
            <li>Icon名称</li>
            <li>角标</li>
            <li>链接到</li>
            <li v-if="$root.buId == 1">筛选条件</li>
            <li>操作</li>
          </ul>
          <div class="rows item-box">
            <ds-item v-if="item != null" :item.sync="item" :index="$index" v-for="item of source" track-by="$index"></ds-item>
          </div>
      </div>
      <ds-operate :source-data.sync="source" :ds_timeline_id="ds_timeline_id"></ds-operate>
    </div>
  </div>
</template>
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
      show: false
    },
    methods: {
      delById(index){
        this.source.splice(index,1);
      }
    },
    components: {
      DsItem,DsOperate
    }
  }
</script>
