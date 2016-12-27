<template>
  <section class="goods-selector-box">
    <el-select v-if="$root.buId == 2" v-model="areaId">
      <el-option v-for="item of saleAreaList" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-input placeholder="搜索商品" class="inline-input" v-model.lazy="name" icon="search"></el-input>
    <el-select class="inline-item" v-model="class1Id">
      <el-option v-for="item of class1List" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select class="inline-item" v-model="class2Id">
      <el-option v-for="item of class2List" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <div class="goods-list-box">
      <div class="no-goods-tip" v-show="!goods.length">无商品数据</div>
      <div v-if="showGoods" v-for="good in goods" :good="good" :class="['good-select-item',{'selected': good.selected}]" @click="toggle(good)">
        <div class="clearfix">
          <input type="hidden" class="good_id" :value="good.object_id">
          <div class="pic">
            <img :src="good.object_img_url">
          </div>
          <div class="text">
            <div>
              <div>{{good.object_id}} {{good.object_name}} {{good.format}}</div>
            </div>
            <div class="price-con">
              <del v-if="good.trick_price" >￥{{good.trick_price}}</del>
              ￥{{good.price}}
            </div>
            <div class="status-icons clearfix">
              <el-tag type="primary" v-if="good.goods_store_type != 0">{{good.store_type_name}}</el-tag>
              <el-tag type="danger" v-if="good.status_name"> {{good.status_name}} </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
  .goods-selector-box {
    margin-bottom: 10px;
    .inline-input {
      margin-top: 5px;
    }
    .inline-item {
      margin-top: 5px;
      display: inline-block;
      width: 49%;
    }
    .no-goods-tip {
      text-align: center;
      color: #FF4949;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .goods-list-box {
      background: #ffffff;
      font-size: 14px;
      color: #324057;
      margin-top: 10px;
      text-align: left;
      overflow: auto;
      .good-select-item {
        cursor: pointer;
        overflow: hidden;
        position: relative;
        min-height: 92px;
        border-left: 4px solid #ffffff;
        border-bottom: 1px solid #ddd;
        .price-con {
          padding-top: 5px;
          padding-bottom: 5px;
          del {
            margin-left: 4px;
            color: #aaaaaa;
          }
        }
        .pic {
          width: 92px;
          float: left;;
          img {
            width: 100%;
          }
        }
        .text {
          margin-left: 92px;
          padding-top: 10px;
          padding-left: 10px;
        }
        &.selected {
          border-left: 4px solid #13CE66;
          .text {
            background: rgba(140, 198, 158, 0.3)
          }
        }
      }
    }
  }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import {Notification} from 'element-ui'
  export default {
    name: 'goodsSelector',
    computed: {
      ...mapGetters({
        module: types.OPERATE_MODULE,
        saleAreaList: types.SALE_AREA_LIST,
        items: types.DS_ITEM_LIST
      }),
      moduleType () {
        return this.module.module.type
      },
      dsItems () {
        return this.items
      },
      goods () {
        let goods = []
        if (!Object.keys(this.goodsList).length) {
          return []
        } else {
          for (let i in this.goodsList) {
            let objectId = this.goodsList[i]['id']
            let item = {
              id: 0,
              store_type: 0,
              user_type: 0,
              price: this.goodsList[i]['price'],
              trick_price: this.goodsList[i]['trick_price'],
              object_id: objectId,
              object_name: this.goodsList[i]['name'] + ' ' + this.goodsList[i]['format'],
              object_img_url: this.goodsList[i]['img_full_url'],
              status_name: this.goodsList[i]['status_name'],
              store_type_name: this.goodsList[i]['store_type_name'],
              goods_status: this.goodsList[i].status,
              goods_sub_status: this.goodsList[i].sub_status,
              goods_store_type: this.goodsList[i].store_type
            }
            if (this.dsItems.length) {
              this.dsItems.forEach((v, j) => {
                if (this.dsItems.hasOwnProperty(j) && v) {
                  if (objectId == v.object_id) {
                    item.selected = true
                  }
                }
              })
              goods.push(item)
            }
          }
          return goods
        }
      }
    },
    data () {
      return {
        showGoods: false,
        groupId: 0,
        name: '',
        areaId: -1,
        class1Id: 0,
        class2Id: 0,
        class1List: [],
        class2List: [],
        goodsList: []
      }
    },
    watch: {
      showGoods () {
        if (this.showGoods) {
          let goodsBox = document.querySelector('.goods-list-box')
          goodsBox.style.height = document.documentElement.clientHeight - 120 + 'px'
        }
      },
      name () {
        this.search({
          data: {area_id: this.areaId, name: this.name},
          callback: (res) => {
            this.goodsList = res
          }
        })
      },
      areaId () {
        this.setClass1List({
          data: {area_id: this.areaId},
          callback: (res) => {
            if (res.length) {
              this.class1Id = res[0].id
              this.class1List = res
            }
          }
        })
      },
      class1Id () {
        this.setClass2List({
          data: {area_id: this.areaId, class_id: this.class1Id},
          callback: (res) => {
            this.class2Id = res[0].id
            this.class2List = res
          }
        })
      },
      class2Id () {
        this.setGoodList({
          data: {area_id: this.areaId, class_id: this.class2Id, page: 1, size: 50},
          callback: (res) => {
            this.showGoods = true
            this.goodsList = res.rows
          }
        })
      }
    },
    methods: {
      ...mapActions({
        setSaleAreaList: types.SET_SALE_AREA_LIST,
        setClass1List: types.SET_CLASS1_LIST,
        setClass2List: types.SET_CLASS2_LIST,
        setGoodList: types.SET_GOOD_LIST,
        search: types.SEARCH_GOOD
      }),
      toggle (good) {
        if (this.moduleType == 7 && !this.isValidGroupModule()) {
          Notification.error({title: '提示', message: '请先建页签'})
          return
        }
        this.dsItems.forEach((v, i) => {
          if (v.object_id == good.object_id) {
            this.dsItems.splice(i, 1)
          } else {
            if (i == this.dsItems.length - 1) {
              if (this.moduleType == 7) {
                good['group_id'] = this.groupId
              }
              this.dsItems.push(good)
            }
          }
        })
      },
      isValidGroupModule () {
        let meta = this.module.meta || []
        let validMeta = meta.filter((value) => {
          return value.status == 1
        })
        return !!validMeta.length
      }
    },
    mounted () {
      if (!this.saleAreaList.length) {
        this.setSaleAreaList({
          data: {},
          callback: (res) => {
            this.areaId = res[0].id
          }
        })
      } else {
        this.areaId = this.saleAreaList[0].id
      }
    }
  }
</script>
