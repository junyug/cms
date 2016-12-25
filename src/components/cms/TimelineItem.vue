<template>
  <li :class="['clearfix', 'timeline-item', {before: isBefore, future: isFuture, now: isNow}]">
    <span class="arrow-icon"></span>
    <span  class="timeline-time" @click.stop="unfold">
      {{item.start_time * 1000|date('%Y-%m-%d %T')}}
      <a v-if="!isBefore" title="编辑" @click.stop="editTimeline" class="btn-edit"><i class="el-icon-edit"></i></a>
      <el-popover v-if="isFuture"
        ref="pop"
        placement="top-end"
        width="160">
        <p>确定要删除该时间线吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click.stop="cancel">取消</el-button>
          <el-button type="primary" size="mini" @click.stop="confirmDel">确定</el-button>
        </div>
        <a title="删除" slot="reference" class="btn-delete"><i class="el-icon-close"></i></a>
      </el-popover>
    </span>
    <span class="timeline-alias">{{item.name}}</span>
    <div class="clearfix ds-item-box">
      <img-edit :isUnfold="isUnfold" v-if="module.module.ds_type == 2"></img-edit>
    </div>
  </li>
</template>
<style lang="scss">
  .timeline-item {
    &.before {
      .arrow-icon {
        border-color: #cccccc !important;
      }
      .timeline-time {
        background: #cccccc !important;
      }
      .timeline-alias {
        color: #cccccc !important;
      }
    }
    &.future {
      .arrow-icon {
        border-color: #ebaeb0 !important;
      }
      .timeline-time {
        background: #ebaeb0 !important;
        .el-icon-edit {
          color: #FF4949;
        }
      }
    }
    &.now {
      .arrow-icon {
        border-color: #FF4949 !important;
      }
      .timeline-time {
        background: #FF4949 !important;
        .el-icon-edit {
          color: #ffffff;
        }
      }
    }
    .ds-item-box {
      clear: both;
      padding-top: 10px;
      img {
        width: 100%;
        padding: 5px 0;
        vertical-align: middle;
      }
      .url-text {
        color: #20a0ff;
        cursor: pointer;
      }
      .delete-item {
        cursor: pointer;
      }
    }
  }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import ImgEdit from '../modules/edit/img_edit'
  export default {
    name: 'timelineItem',
    props: {
      timeline: {},
      unfoldId: 0
    },
    computed: {
      ...mapGetters({
        module: types.OPERATE_MODULE
      }),
      item () {
        return Object.assign({}, this.timeline)
      },
      dsItems () {
        return this.item.item || []
      },
      isUnfold () {
        return this.unfoldId == this.item.id
      },
      isBefore () {
        return Date.now() > this.item.end_time * 1000
      },
      isFuture () {
        return Date.now() < this.item.start_time * 1000
      },
      isNow () {
        return this.item.start_time * 1000 <= Date.now() && Date.now() <= this.item.end_time * 1000
      }
    },
    methods: {
      ...mapActions({
        'delete': types.DELETE_TIMELINE,
        'setDsItemList': types.SET_DS_ITEM_LIST,
        'setTimelineId': types.SET_OPERATE_TIMELINE_ID
      }),
      urlText (row) {
        if (row.url_name) {
          return row.url_name
        } else if (row.h5_url) {
          return row.h5_url + ' ' + row.app_url
        } else {
          return '无链接'
        }
      },
      editImg (ds) {
        let managerParent = this.$parent.$parent.$parent.$parent
        managerParent.editImg(ds)
      },
      selectUrl (ds) {
        let managerParent = this.$parent.$parent.$parent.$parent
        managerParent.showUrlDialog(ds)
      },
      unfold () {
        if (this.unfoldId != this.item.id) {
          this.$emit('setUnfoldId', this.item.id)
          this.setDsItemList({data: this.dsItems})
          this.setTimelineId({data: {id: this.item.id}})
        } else {
          this.$emit('setUnfoldId', 0)
          this.setDsItemList({data: []})
          this.setTimelineId({data: {id: 0}})
        }
      },
      cancel () {
        this.$refs.pop.showPopper = false
      },
      confirmDel () {
        this.delete({
          data: {id: this.item.id},
          callback: (data) => {
            this.$refs.pop.showPopper = false
          }
        })
      },
      editTimeline () {
        this.$emit('timelineEdit', this.item)
      }
    },
    components: {
      ImgEdit
    },
    mounted () {
      if (this.item.start_time * 1000 <= Date.now() && Date.now() <= this.item.end_time * 1000) {
        this.setDsItemList({data: this.dsItems})
        this.$emit('setUnfoldId', this.item.id)
        this.setTimelineId({data: {id: this.item.id}})
      }
    }
  }
</script>
