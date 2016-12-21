<template>
  <el-dialog :title='title' v-model="dialogVisible" @close="closeDialog">
    <el-form :model="timeline" label-width="120px" class="dialog-content">
      <el-form-item v-if="!isEdit" label="上线时间">
        <el-date-picker
          :editable="true"
          v-model="starttime"
          type="datetime"
          placeholder="选择日期时间"
          align="left"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注名称">
        <el-input size="small" v-model="timeline.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="克隆数据段" v-if="!isEdit">
        <el-select v-model="dsTimelineId">
          <el-option label="请选择数据段" :value="0"></el-option>
          <el-option v-for="item of timelineList" :label="item.start_time * 1000|date('%F %T')" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否含内边距">
        <el-switch v-model="hasPadding"
          on-text=""
          off-text=""></el-switch>
      </el-form-item>
      <el-form-item label="是否含上边距">
        <el-switch v-model="hasMargin"
          on-text=""
          off-text=""></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">保存</el-button>
    </div>
  </el-dialog>
</template>
<style lang='scss'>
  .dialog-content {
    .el-form-item {
      margin-bottom: 10px;
      .el-input {
        width: 400px;
      }
    }
  }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  export default {
    name: 'timelineDialog',
    props: {
      title: '',
      showEdit: false,
      params: {},
      isEdit: false
    },
    data () {
      return {
        pickerOptions: {
          shortcuts: [
            {
              text: [new Date(this.$root.time * 1000).getHours(), '00'].join(':'),
              onClick: (picker) => {
                const date = new Date(this.$root.time * 1000)
                picker.$emit('pick', date)
              }
            },
            {
              text: '此刻',
              onClick: (picker) => {
                const date = new Date()
                let seconds = date.getSeconds()
                picker.$emit('pick', date.getTime() + 1000 * 60 - seconds * 1000)
              }
            }
          ],
          disabledDate (time) {
            return time < new Date().getTime()
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        timelineList: types.MODULE_TIMELINE_LIST
      }),
      timeline () {
        return this.params
      },
      dsTimelineId: {
        get () {
          return this.timeline.ds_timeline_id
        },
        set (val) {
          this.timeline.ds_timeline_id = val
        }
      },
      dialogVisible () {
        return this.showEdit
      },
      starttime: {
        get () {
          return this.timeline.start_time * 1000 || this.$root.time * 1000
        },
        set (val) {
          this.timeline.start_time = parseInt(val / 1000)
        }
      },
      hasPadding: {
        get () {
          return !!this.timeline.style['padding']
        },
        set (val) {
          this.timeline.style['padding'] = val
        }
      },
      hasMargin: {
        get () {
          return !!this.timeline.style['margin']
        },
        set (val) {
          this.timeline.style['margin'] = val
        }
      }
    },
    methods: {
      ...mapActions({
        add: types.ADD_TIMELINE,
        update: types.UPDATE_TIMELINE
      }),
      closeDialog () {
        this.$emit('close', false)
      },
      submit () {
        console.log(JSON.stringify(this.timeline))
      }
    }
  }
</script>
