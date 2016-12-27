<template>
  <section class="ds-list-box" v-show="isUnfold">
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>确定要删除这条数据吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.stop="confirmDel">确 定</el-button>
      </span>
    </el-dialog>
    <el-table class="list-box" :data="dsItems">
      <el-table-column label="#" type="index" width="80px" inline-template>
        <el-input :value="$index+1"></el-input>
      </el-table-column>
      <el-table-column width="168px" label="图片" inline-template>
        <img :src="row.object_img_url">
      </el-table-column>
      <el-table-column label="商品ID" prop="object_id"></el-table-column>
      <el-table-column label="商品名称" inline-template>
        <span>
          {{row.object_name}}
          <el-tag type="gray" v-if="row.goods_status == 0 && row.status_name != '正常' && row.status_name != ''">{{row.status_name}}</el-tag>
          <el-tag type="danger" v-if="row.goods_status != 0 && row.status_name != '正常' && row.status_name != ''">{{row.status_name}}</el-tag>
          <el-tag type="primary" v-if="row.goods_store_type != 0">{{row.store_type_name}}</el-tag>
        </span>
      </el-table-column>
      <el-table-column :context="_self" label="筛选条件" v-if="$root.buId == 1" inline-template>
        <span @click.stop="setCurrent($index)">
          <user-select ref='userType' :selected="row.user_type" @userTypeChange="userTypeChange"></user-select>
        </span>
      </el-table-column>
      <el-table-column v-if="!$parent.isBefore" width="100px" align="center" label="删除" inline-template>
        <a class="delete-item" @click.stop="dsDel($index, row)"><i class="el-icon-delete"></i></a>
      </el-table-column>
    </el-table>
    <ds-operate :isBefore="$parent.isBefore"></ds-operate>
  </section>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../../vuex/mutation-types'
  import {Notification} from 'element-ui'
  import userSelect from '../../common/userSelect'
  import DsOperate from '../../cms/DsItemOperating'
  export default {
    name: 'goodsFormEdit',
    props: {
      isUnfold: false
    },
    computed: {
      ...mapGetters({
        module: types.OPERATE_MODULE,
        items: types.DS_ITEM_LIST,
        timelineId: types.OPERATE_TIMELINE_ID
      }),
      templateCode () {
        return this.module.module.template_code
      },
      dsItems () {
        return this.items
      }
    },
    data () {
      return {
        operateIndex: 0,
        dialogVisible: false,
        dsId: 0
      }
    },
    methods: {
      ...mapActions({
        'delete': types.DELETE_ITEM
      }),
      dsDel (index, ds) {
        if (ds.id == 0) {
          this.dsItems.splice(index, 1)
        } else {
          this.dsId = ds.id
          this.dialogVisible = true
        }
      },
      confirmDel (row) {
        this.delete({
          data: {id: this.dsId, ds_timeline_id: this.timelineId},
          callback: (data) => {
            Notification.success({title: '提示', message: '数据删除成功'})
            this.dialogVisible = false
          }
        })
      },
      setCurrent (index) {
        this.operateIndex = index
      },
      userTypeChange (val) {
        this.dsItems[this.operateIndex].user_type = val
      }
    },
    components: {
      userSelect, DsOperate
    }
  }
</script>
