<template>
  <el-dialog :title='title' v-model="dialogVisible" @close="closeDialog">
    <el-form label-width="120px" class="dialog-content">
      <el-form-item v-if="!isEdit" label="上线时间">
        <el-date-picker
          :editable="true"
          v-model="start_time"
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
          <el-option v-for="item of list" :label="item.start_time * 1000|date('%F %T')" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="背景颜色" v-if="setBg">
        <div class="color-box">
          <span class="color-tag" :style="{background: bgColors.hex}"></span>
          <a class="color-edit" title="设置" @click.stop="showBgPicker=!showBgPicker"><i class="el-icon-edit"></i></a>
          <color-picker class="color-picker" v-model="bgColors" v-show="showBgPicker" @change-color="changeBgColor"></color-picker>
        </div>
      </el-form-item>
      <el-form-item label="文本颜色" v-if="setColor">
        <div class="color-box">
          <span class="color-tag" :style="{background: textColors.hex}"></span>
          <a class="color-edit" title="设置" @click.stop="showTextPicker=!showTextPicker"><i class="el-icon-edit"></i></a>
          <color-picker class="color-picker" v-model="textColors" v-show="showTextPicker" @change-color="changeTextColor"></color-picker>
        </div>
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
      <el-button type="primary" @click.stop="submit">保存</el-button>
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
    .color-box {
      position: relative;
      .color-tag {
        border: solid 1px #99A9BF;
        border-radius: 5px;
        padding: 4px 25px;
      }
      .color-edit {
        padding: 4px 6px;
      }
      .color-picker {
        position: absolute;
        top: 32px;
        z-index: 99;
      }
    }
  }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import {Chrome} from '../common/vue-color/src/index'
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
        setBg: true,
        setColor: true,
        showBgPicker: false,
        showTextPicker: false,
        bgColors: {
          hex: '#FFFFFF'
        },
        textColors: {
          hex: ''
        },
        timeline: {
          start_time: this.$root.time,
          name: '',
          ds_timeline_id: this.params.ds_timeline_id,
          style: {
            color: this.params.style['color'],
            'background-color': this.params.style['background-color'],
            padding: this.params.style['padding'],
            margin: this.params.style['margin']
          },
          page_module_id: this.params.page_module_id
        },
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
        timelineList: types.MODULE_TIMELINE_LIST,
        module: types.OPERATE_MODULE
      }),
      list () {
        return this.timelineList.sort((a, b) => {
          return b.start_time > a.start_time
        })
      },
      setBg () {
        return this.module.module.type != 6
      },
      setColor () {
        return this.module.module.type == 5
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
      start_time: {
        get () {
          return this.timeline.start_time * 1000 || this.$root.time * 1000
        },
        set (val) {
          this.timeline.start_time = parseInt((val - new Date(val).getSeconds() * 1000) / 1000)
        }
      },
      hasPadding: {
        get () {
          return this.timeline.style['padding'] != 0
        },
        set (val) {
          this.timeline.style['padding'] = val ? '0 0.15rem 0 0.15rem' : 0
        }
      },
      hasMargin: {
        get () {
          return this.timeline.style['margin'] != 0
        },
        set (val) {
          this.timeline.style['margin'] = val ? '4% 0 0 0' : 0
        }
      }
    },
    watch: {
      params: {
        handler () {
          this.timeline = this.params
          this.bgColors.hex = this.params.style['background-color']
          this.textColors.hex = this.params.style['color']
        },
        deep: true
      }
    },
    methods: {
      ...mapActions({
        add: types.ADD_TIMELINE,
        update: types.UPDATE_TIMELINE
      }),
      changeBgColor (val) {
        this.bgColors.hex = val.hex
        this.showBgPicker = false
        this.timeline.style['background-color'] = val.hex
      },
      changeTextColor (val) {
        this.textColors.hex = val.hex
        this.showTextPicker = false
        this.timeline.style['color'] = val.hex
      },
      closeDialog () {
        this.$emit('close', false)
      },
      submit () {
        let style = JSON.stringify(this.timeline.style)
        let params = Object.assign({}, this.timeline)
        params.style = style
        if (this.isEdit) {
          this.update({
            data: {
              id: params.id,
              name: params.name,
              style: params.style
            },
            callback: (data) => {
              this.closeDialog()
            }
          })
        } else {
          this.add({
            data: params,
            callback: (data) => {
              this.closeDialog()
            }
          })
        }
      }
    },
    components: {
      'color-picker': Chrome
    }
  }
</script>
