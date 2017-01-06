<template>
  <div class="clearfix">
    <el-dialog v-model="showDialog" :title="dialogTitle" @close="closeDialog">
      <div slot="header" class="header-box clearfix">
        <h4 class="module-title">模块信息</h4>
        <button type="button" class="close" aria-label="Close" @click.stop="hideDialog"><span aria-hidden="true">&times;</span></button>
      </div>
      <div slot="body">
        <div class="form-horizontal">
          <div class="form-group">
            <div class="col-sm-12">
              <input class="form-control" placeholder="模块名称" name="name" type="input" v-model="module.name">
            </div>
          </div>
        </div>
        <div class="tab-setting-box" v-if="module.module.template_code == 'group_tab_1xn'">
          <div class="header-box">
            <h4 class="module-title">页签设置</h4>
          </div>
          <div class="form-horizontal list-box">
            <ul class="tab-title">
              <li>排序</li>
              <li>页签名称</li>
              <li>描述</li>
              <li></li>
            </ul>
            <ul class="tab-content">
              <li v-for="tab in tabList">
                <span class="sort-input"><input class="form-control" name="sort" type="input" :value="$index + 1" @keyup.13="changeSort(tabList,$index,$event)"></span>
                <input class="form-control" name="name" type="input" v-model="tab.name">
                <input class="form-control" name="desc" type="input" v-model="tab.desc">
                <button v-if="tab.group_id != 0" type="button" class="btn" :class="{'btn-danger': parseInt(tab.status),'btn-success': !parseInt(tab.status)}" @click="switchStatus($index, tab.status)">
                  <span class="fa fa-arrow-down" v-if="tab.status == 1"></span><span v-if="tab.status == 1">下线</span>
                  <span class="fa fa-arrow-up" v-if="tab.status == 0"></span><span v-if="tab.status == 0">上线</span>
                </button>
                <button class="btn-remove" v-if="tab.group_id == 0" @click="remove($index)">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-setting-box" v-if="module.module.template_code == 'group_seckill_1xn'">
          <div class="header-box" style="display:none;">
            <h4 class="module-title">秒杀设置</h4>
          </div>
          <div class="form-horizontal list-box seckill-box">
            <ul class="tab-title">
              <li>排序</li>
              <li>页签名称</li>
              <li>描述</li>
              <li>开始时间</li>
              <li>结束时间</li>
              <li></li>
            </ul>
            <ul class="tab-content">
              <li v-for="tab in tabList">
                <span class="sort-input"><input class="form-control" style="width: 50px;" name="sort" type="input" :value="$index + 1" @keyup.13="changeSort(tabList,$index,$event)"></span>
                <input class="form-control" name="name" type="input" v-model="tab.name">
                <input class="form-control" name="name" type="input" v-model="tab.desc">
                <v-date-picker type="time" :date-result="tab.start_time*1000|date('%T')" @change="startTimeChange"></v-date-picker>
                <v-date-picker type="time" :date-result="tab.end_time*1000|date('%T')" @change="endTimeChange"></v-date-picker>
                <button v-if="tab.group_id != 0" type="button" class="btn" :class="{'btn-danger': parseInt(tab.status),'btn-success': !parseInt(tab.status)}" @click="switchStatus($index, tab.status)">
                  <span class="fa fa-arrow-down" v-if="tab.status == 1"></span><span v-if="tab.status == 1">下线</span>
                  <span class="fa fa-arrow-up" v-if="tab.status == 0"></span><span v-if="tab.status == 0">上线</span>
                </button>
                <button class="btn-remove" v-if="tab.group_id == 0" @click="remove($index)">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div slot="footer" class="clearfix">
        <button class="modal-default-button btn btn-success" @click="addNewTab">新建</button>
        <button class="modal-default-button btn btn-primary" @click.stop="saveModuleInfo">完成</button>
      </div>
    </el-dialog>
  </div>
</template>
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
      'start_time': Math.floor(new Date().getTime() / 1000),
      'end_time': Math.floor((new Date('2038/01/01').getTime()) / 1000),
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
      component () {
        return Object.assign({}, this.module)
      },
      tabList () {
        return this.module['meta'].length ? this.module['meta'] : (this.module.module.template_code == 'group_tab_1xn' ? [
          {group_id: 0, name: 'Tab1', desc: '', status: 1},
          {group_id: 0, name: 'Tab2', desc: '', status: 1}
        ] : [
          {
            group_id: 0, name: 'Tab1', desc: '', status: 1,
            'start_time': Math.floor(new Date().getTime() / 1000),
            'end_time': Math.floor((new Date('2038/01/01').getTime()) / 1000)
          },
          {
            group_id: 0, name: 'Tab2', desc: '', status: 1,
            'start_time': Math.floor(new Date().getTime() / 1000),
            'end_time': Math.floor((new Date('2038/01/01').getTime()) / 1000)
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
        update: types.UPDATE_MODULE,
        deleteById: types.DELETE_MODULE
      }),
      startTimeChange (time, event) {
        let index = (event.target).parents('li').index()
        let startTime = Math.floor(new Date(time).getTime() / 1000)
        this.tabList[index].start_time = startTime
      },
      endTimeChange (time, event) {
        let index = (event.target).parents('li').index()
        let endTime = Math.floor(new Date(time).getTime() / 1000)
        this.tabList[index].end_time = endTime
      },
      cancelDel () {
        this.$refs.pop.showPopper = false
      },
      confirmDel () {
        this.deleteById({
          data: {id: this.component.id},
          callback: (data) => {
            this.$refs.pop.showPopper = false
          }
        })
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
        this.updateModuleById(
          {
            id: this.module.id,
            name: this.module.name,
            meta: JSON.stringify(this.tabList)}, (res) => {
          if (res.ret == 1) {
            this.tabList = res.data.meta
            this.module = res.data
            this.setCurrentPageModule(this.module)
            this.show = false
            Notification.success('保存成功')
          } else {
            Notification.error(res.error)
          }
        })
      }
    }
  }
</script>
