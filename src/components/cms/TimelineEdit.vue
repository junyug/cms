<template>
  <section id="timeline">
    <timeline-dialog :show-edit="show" :title="dialogTitle" :is-edit="isEdit" :params="timeline" @close="close"></timeline-dialog>
    <div class="timeline-list-box">
      <el-row type="flex" align="top">
        <el-col class="edit-box">
          <h3 class="component-title">{{title}}</h3>
          <ul class="timeline-list">
            <li class="clearfix timeline-item new-timeline">
              <span class="arrow-icon" @click.stop="addTimeline"><i class="el-icon-circle-close"></i></span>
              <span @click.stop="addTimeline" class="timeline-time">新建时间线</span>
            </li>
            <timeline-item :unfoldId="unfoldId" :timeline="item" :key="item.id" v-for="(item, index) of timelineList" @timelineEdit="editTimeline" @setUnfoldId="setUnfoldId"></timeline-item>
          </ul>
        </el-col>
        <el-col v-if="goodsFilter" :class="['goods-filter-box', {'filter-fixed': isFixed}]">
          <goods-selector></goods-selector>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<style lang="scss">
  #timeline {
    h3 {
      border-left: solid 5px #20A0FF;
      padding: 10px;
      font-size: 16px;
      text-align: left;
      color: #20A0FF;
    }
    .timeline-list-box {
      .edit-box {
        flex: 1;
      }
      .goods-filter-box {
        width: 250px;
        &.filter-fixed {
          position: fixed;
          top: 0;
          right: 11px;
        }
      }
      .timeline-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      .timeline-item {
        position: relative;
        padding: 10px 15px;
        border: none;
        text-align: left;
        border-left: 2px solid #fff;
        font-size: 14px;
        &.new-timeline {
          position: relative;
          padding: 10px 15px;
          border: none;
          text-align: left;
          border-left: 2px solid #fff;
          font-size: 14px;
          color: #ebaeb0;
          .arrow-icon {
            left: -11px;
            top: 9px;
            border: none;
            font-size: 20px;
            transform: rotate(45deg);
          }
        }
        .arrow-icon {
          position: absolute;
          z-index: 1;
          top: 13px;
          left: -7px;
          border: 6px solid #ebaeb0;
          border-radius: 100%;
        }
        .timeline-time {
          float: left;
          padding: 4px 10px 3px;
          border-radius: 13px;
          background: #ebaeb0;
          color: #ffffff;
          font-size: 12px;
          cursor: pointer;
          a {
            display: none;
            padding: 0 3px;
            color: #ffffff;
          }
          &:hover {
            a {
              color: #FF4949;
              display: inline;
            }
          }
        }
        .timeline-alias {
          color: #1D8CE0;
          float: left;
          padding-left: 10px;
          line-height: 19px;
        }
        .timeline-spacing {
          float: left;
          padding-left: 10px;
          margin-top: -2px;
        }
      }
    }
  }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import TimelineDialog from './TimelineDialog'
  import TimelineItem from './TimelineItem'
  import GoodsSelector from './GoodsSelector'
  const titleMap = {
    '1': '轮播图',
    '2': '图片',
    '3': '商品',
    '4': 'Icon',
    '5': '文本',
    '6': '弹窗',
    '7': '组合'
  }
  export default {
    name: 'timelineEdit',
    props: {
      isFixed: false
    },
    computed: {
      ...mapGetters({
        module: types.OPERATE_MODULE,
        timelineList: types.MODULE_TIMELINE_LIST
      }),
      title () {
        return titleMap[this.module.module.type] || '图片'
      },
      goodsFilter () {
        return this.module.module.ds_type == 1 && this.unfoldId != 0
      }
    },
    data () {
      return {
        show: false,
        isEdit: false,
        dialogTitle: '',
        delId: 0,
        unfoldId: 0,
        timeline: {
          id: 0,
          start_time: this.$root.time,
          name: '',
          ds_timeline_id: 0,
          style: {
            color: '',
            'background-color': '',
            margin: 0,
            padding: 0
          },
          page_module_id: ''
        }
      }
    },
    watch: {
      module: {
        handler () {
          document.querySelector('body').scrollTop = 0
        },
        deep: true
      }
    },
    methods: {
      ...mapActions({
        'delete': types.DELETE_TIMELINE
      }),
      close () {
        this.show = false
      },
      setUnfoldId (timelineId) {
        this.unfoldId = timelineId
      },
      addTimeline () {
        this.dialogTitle = '添加时间线'
        this.show = true
        this.isEdit = false
        this.timeline.start_time = this.$root.time
        this.timeline.style.color = ''
        if (this.$root.buId == 1) {
          this.timeline.style['background-color'] = '#FFFFFF'
        } else {
          this.timeline.style['background-color'] = '#F5F5F5'
        }
        this.timeline.style['margin'] = 0
        this.timeline.style['padding'] = 0
        this.timeline.name = ''
        this.timeline.id = 0
        this.timeline.ds_timeline_id = 0
        this.timeline.page_module_id = this.module.id
      },
      editTimeline (timeline) {
        let style = timeline.style
        this.dialogTitle = '编辑时间线'
        this.show = true
        this.isEdit = true
        this.timeline.style.color = style['color']
        this.timeline.style['background-color'] = style['background-color']
        this.timeline.style['margin'] = style['margin']
        this.timeline.style['padding'] = style['padding']
        this.timeline.name = timeline.name
        this.timeline.id = timeline.id
        this.timeline.page_module_id = this.module.id
      }
    },
    components: {
      TimelineDialog, TimelineItem, GoodsSelector
    }
  }
</script>
