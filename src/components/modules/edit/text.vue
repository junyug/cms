<template>
  <div class="clearfix">
    <div class="clearfix"></div>
    <div class="clearfix img-component-data" v-show="show">
      <div class="rows">
          <ul class="flex-box list-title clearfix">
            <li>#</li>
            <li>文本内容</li>
            <li>链接地址</li>
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
        }
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
