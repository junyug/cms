<template>
  <ul class="flex-box list-box clearfix"
      v-draggable:z="{index: index, dragged: 'dragged','item': item}"
      v-dropzone:z="$parent.sort($parent.currentDsItemsData, index, $dropdata)">
    <li><input style="width: 50px;" type="text" v-model="sortId" @change="$parent.changeSort($parent.currentDsItemsData, index, $event)"></li>
    <li>
      <img :src="item.object_img_url">
    </li>
    <li title="{{item.object_id}}"><span style="display: block;overflow:hidden;text-overflow: ellipsis;">{{item.object_id}}</span></li>
    <li>
      <span>{{item.object_name}}
        <em class="good-status-{{item.goods_status}}" v-if="item.status_name != '正常' && item.status_name != ''">{{item.status_name}}</em>
        <em class="good-store-{{item.goods_store_type}}" v-if="item.goods_store_type != 0">{{item.store_type_name}}</em>
      </span>
    </li>
    <li v-if="$root.buId == 1">
      <section><user-select :selected="item.user_type"></user-select></section>
    </li>
    <li>
      <span class="delete-item" @click="$parent.deleteDs($event)" v-if="!$parent.$parent.$parent.isBefore">
        <i class="fa fa-times" aria-hidden="true"></i>
      </span>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
  .list-box li {
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
  import userSelect from '../../common/userSelect';
  export default {
    props: {
      index: 0,
      templateCode: '',
      item: {}
    },
    data() {
      return {}
    },
    computed: {
      sortId: function() {
        return this.index + 1;
      }
    },
    components:{
      userSelect
    }
  }
</script>
