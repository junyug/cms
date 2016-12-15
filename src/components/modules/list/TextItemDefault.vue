<template>
  <ul class="flex-box list-box clearfix"
      v-draggable:z="{index: index, dragged: 'dragged','item': item}"
      v-dropzone:z="$parent.sort($parent.currentDsItemsData, index, $dropdata)">
    <li>{{index + 1}}</li>
    <li v-if="templateCode=='text'"><input placeholder="文本内容" type="text" class="form-control" v-model="item.object_name"/></li>
    <li v-if="templateCode=='text_title_1'"><input placeholder="文本内容" type="text" class="form-control" v-model="item.object_name"/></li>
    <li v-if="templateCode=='text_title_1'"><input placeholder="角标" type="text" class="form-control" v-model="item.icon_text"/></li>
    <li @click="$parent.selectUrl(item, $event)">
      <span class="url-text">{{$parent.urlText}}</span>
    </li>
    <li v-if="$root.buId == 1">
      <section><user-select :selected.sync="item.user_type"></user-select></section>
    </li>
    <li>
      <span class="delete-item" v-if="!$parent.$parent.$parent.isBefore" @click="$parent.deleteDs(index,$event)">
        <i class="fa fa-times" aria-hidden="true"></i>
      </span>
    </li>
  </ul>
</template>
<script>
  import VueFileUpload from 'vue-file-upload';
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
    components:{
      VueFileUpload,userSelect
    }
  }
</script>
