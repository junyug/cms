<template>
  <el-table :data="items" v-show="isUnfold">
    <el-table-column label="#" type="index"></el-table-column>
    <el-table-column width="168px" label="图片" inline-template>
      <img :src="row.object_img_url" @click="editImg(row)">
    </el-table-column>
    <el-table-column label="名称" inline-template>
      <el-input placeholder="图片名称" :value="row.object_name"></el-input>
    </el-table-column>
    <el-table-column label="链接到" inline-template>
      <span class="url-text" @click.stop="selectUrl(row)">{{urlText(row)}}</span>
    </el-table-column>
    <el-table-column label="筛选条件" v-if="$root.buId == 1"></el-table-column>
    <el-table-column width="100px" align="center" label="删除" inline-template>
      <a class="delete-item"><i class="el-icon-delete"></i></a>
    </el-table-column>
  </el-table>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../../vuex/mutation-types'
  export default {
    name: 'textFormEdit',
    props: {
      isUnfold: false
    },
    computed: {
      ...mapGetters({
        module: types.OPERATE_MODULE,
        items: types.DS_ITEM_LIST
      }),
    }
  }
</script>
