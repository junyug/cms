<template>
  <div class="clearfix">
    <el-dialog v-model="showDialog" :title="dialogTitle" @close="closeDialog" :close-on-click-modal="false">
      <div><el-input placeholder="模块名称" v-model="module.name"></el-input></div>
      <div class="tab-setting-box" v-if="module.module.template_code == 'group_tab_1xn'">
        <h4 class="module-title">页签设置</h4>
        <el-table :data="tabList">
          <el-table-column width="80" label="排序" inline-template>
            <span><el-input :value="$index + 1" @keyup.native.13="changeSort(tabList,$index,$event)"></el-input></span>
          </el-table-column>
          <el-table-column label="页签名称" inline-template>
            <span><el-input v-model="row.name"></el-input></span>
          </el-table-column>
          <el-table-column label="描述" inline-template>
            <span><el-input v-model="row.desc"></el-input></span>
          </el-table-column>
          <el-table-column width="80" align="center" inline-template>
            <div>
              <el-button v-if="row.group_id != 0" type="text" @click="switchStatus($index, row.status)">
                <i class="el-icon-circle-check" v-if="row.status == 1"></i>
                <i class="el-icon-circle-cross" v-else></i>
              </el-button>
              <el-button v-if="row.group_id == 0 && $index > 1" type="text" @click="remove($index)">
                <i class="el-icon-delete2"></i>
              </el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <div class="tab-setting-box" v-if="module.module.template_code == 'group_seckill_1xn'">
        <h4 class="module-title">秒杀设置</h4>
        <el-table :data="tabList">
          <el-table-column width="80" label="排序" inline-template>
            <span><el-input :value="$index + 1" @keyup.native.13="changeSort(tabList,$index,$event)"></el-input></span>
          </el-table-column>
          <el-table-column label="页签名称" inline-template>
            <span><el-input v-model="row.name"></el-input></span>
          </el-table-column>
          <el-table-column label="描述" inline-template>
            <span><el-input v-model="row.desc"></el-input></span>
          </el-table-column>
          <el-table-column width="200" label="开始时间" inline-template>
            <el-time-select
              class="time-box"
              size="small"
              :editable="false"
              v-model="row.start_time"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:00'
              }"
              placeholder="选择时间"
              @change="startTimeChange">
            </el-time-select>
          </el-table-column>
          <el-table-column width="200" label="结束时间" inline-template>
            <el-time-select
              class="time-box"
              size="small"
              :editable="false"
              v-model="row.end_time"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:00'
              }"
              placeholder="选择时间"
              @change="endTimeChange">
            </el-time-select>
          </el-table-column>
          <el-table-column width="80" align="center" inline-template>
            <div>
              <el-button v-if="row.group_id != 0" type="text" @click="switchStatus($index, row.status)">
                <i class="el-icon-circle-check" v-if="row.status == 1"></i>
                <i class="el-icon-circle-cross" v-else></i>
              </el-button>
              <el-button v-if="row.group_id == 0 && $index > 1" type="text" @click="remove($index)">
                <i class="el-icon-delete2"></i>
              </el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button type="success" @click="addNewTab">新建</el-button>
        <el-button type="primary" @click.stop="saveModuleInfo">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
  .tab-setting-box {
    input {margin: 5px 0;}
    .time-box {
      input {margin: 0;}
    }
  }
</style>
<script>
  import * as types from '../../../vuex/mutation-types'
  import {mapActions, mapGetters} from 'vuex'
  import {Notification} from 'element-ui'
  function InitTab () {
    return {
      'group_id': 0,
      'name': '',
      'desc': '',
      'status': 1
    }
  }
  function InitSeckillTab () {
    return {
      'group_id': 0,
      'name': '',
      'desc': '',
      // 'start_time': Math.floor(new Date().getTime() / 1000),
      // 不进行日期的判断改为字符串形式
      'start_time': '00:00',
      // 'end_time': Math.floor((new Date('2038/01/01').getTime()) / 1000),
      // 不进行日期的判断改为字符串形式
      'end_time': '23:00',
      'status': 1
    }
  }
  export default {
    name: 'editGroupTabComponent',
    props: ['show'],
    computed: {
      ...mapGetters({
        module: types.OPERATE_MODULE
      }),
      tabList () {
        return this.module['meta'].length ? this.module['meta'] : (this.module.module.template_code == 'group_tab_1xn' ? [
          {group_id: 0, name: 'Tab1', desc: '', status: 1},
          {group_id: 0, name: 'Tab2', desc: '', status: 1}
        ] : [
          {
            group_id: 0, name: 'Tab1', desc: '', status: 1,
            'start_time': '00:00',
            'end_time': '23:00'
          },
          {
            group_id: 0, name: 'Tab2', desc: '', status: 1,
            'start_time': '00:00',
            'end_time': '23:00'
          }])
      },
      showDialog () {
        return this.show
      }
    },
    data () {
      return {
        dialogTitle: '编辑模块',
        showDialog: false
      }
    },
    methods: {
      ...mapActions({
        update: types.UPDATE_MODULE
      }),
      // 时间改为字符串方式，用v-model双向绑定,该方法暂时弃用
      startTimeChange (time, event) {
        let index = (event.target).parents('li').index()
        let startTime = Math.floor(new Date(time).getTime() / 1000)
        this.tabList[index].start_time = startTime
      },
      // 时间改为字符串方式，用v-model双向绑定,该方法暂时弃用
      endTimeChange (time, event) {
        let index = (event.target).parents('li').index()
        let endTime = Math.floor(new Date(time).getTime() / 1000)
        this.tabList[index].end_time = endTime
      },
      closeDialog () {
        this.$emit('closeGroupDialog', false)
      },
      addNewTab () {
        if (this.module.module.template_code == 'group_tab_1xn') {
          this.tabList.push(new InitTab())
        } else {
          this.tabList.push(new InitSeckillTab())
        }
        this.module['meta'] = this.tabList
      },
      switchStatus (index, status) {
        status = status == 0 ? 1 : 0
        for (let i = 0, len = this.tabList.length; i < len; i++) {
          if (index == i) {
            this.tabList[i].status = status
            return
          }
        }
      },
      remove (index) {
        for (let i = 0, len = this.tabList.length; i < len; i++) {
          if (index == i) {
            this.tabList.splice(i, 1)
            return
          }
        }
      },
      changeSort: function (list, index, $event) {
        let id = $event.srcElement.value - 1
        this.sort(list, id, {index: index})
      },
      sort: function (list, id, data) {
        if (list.length == 0) return
        let item = list[data.index]
        list.splice(data.index, 1)
        data.index < id ? list.splice(id - 1, 0, item) : list.splice(id, 0, item)
      },
      saveModuleInfo (e) {
        this.tabList = this.tabList.filter((value) => {
          return value.name !== ''
        })
        if (this.tabList.length == 0) {
          Notification.error('页签名称不能为空')
          return
        }
        this.update({
          data: {
            id: this.module.id,
            name: this.module.name,
            meta: JSON.stringify(this.tabList)
          },
          callback: (res) => {
            Notification.success('保存成功')
            this.closeDialog()
          }
        })
      }
    }
  }
</script>
