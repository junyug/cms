<template>
  <section id="timeline">
    <timeline-dialog :show-edit="show" :title="dialogTitle" :is-edit="isEdit" :params="timeline" @close="close"></timeline-dialog>
    <h3 class="component-title">{{title}}</h3>
    <div class="timeline-list-box">
      <ul class="timeline-list">
        <li class="clearfix timeline-item new-timeline" @click.stop="addTimeline">
          <span class="arrow-icon"><i class="el-icon-circle-close"></i></span>
          <span class="timeline-time">新建时间线</span>
        </li>
        <li class="clearfix timeline-item" v-for="(item, index) of timelineList" :key="index">
          <span class="arrow-icon"></span>
          <span  class="timeline-time">
            {{item.start_time * 1000|date('%Y-%m-%d %T')}}
            <a title="编辑" @click.stop="editTimeline(item)" class="btn-edit"><i class="el-icon-edit"></i></a>
            <el-popover
              ref="pop"
              placement="top-end"
              width="160">
              <p>确定要删除该时间线吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click.stop="cancel(index)">取消</el-button>
                <el-button type="primary" size="mini" @click.stop="confirmDel(index)">确定</el-button>
              </div>
              <a title="删除" slot="reference" class="btn-delete" @click.stop="deleteTimeline(item)"><i class="el-icon-close"></i></a>
            </el-popover>
          </span>
          <span class="timeline-alias">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
<style lang="scss" scoped>
  #timeline {
    h3 {
      border-left: solid 5px #20A0FF;
      padding: 10px;
      font-size: 16px;
      text-align: left;
      color: #20A0FF;
    }
    .timeline-list-box {
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
    computed: {
      ...mapGetters({
        module: types.OPERATE_MODULE,
        timelineList: types.MODULE_TIMELINE_LIST
      }),
      title () {
        return titleMap[this.module.module.type] || '图片'
      }
    },
    data () {
      return {
        show: false,
        isEdit: false,
        dialogTitle: '',
        delId: 0,
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
    methods: {
      ...mapActions({
        'delete': types.DELETE_TIMELINE
      }),
      close () {
        this.show = false
      },
      cancel (index) {
        this.$refs.pop[index].showPopper = false
      },
      confirmDel (index) {
        this.delete({
          data: {id: this.delId},
          callback: (data) => {
            this.$refs.pop[index].showPopper = false
          }
        })
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
      },
      deleteTimeline (timeline) {
        this.delId = timeline.id
      }
    },
    components: {
      TimelineDialog
    }
  }
</script>
