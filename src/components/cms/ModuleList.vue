<template>
  <div class="moduleslist">
    <div v-for="module in moduleList">
      <div class="pic-box" v-if="module.type == 2">
        <h3>图片</h3>
        <div class="clearfix component-box">
          <div class="component-item" v-for="item in module.items">
            <div class="img-1-n" v-if="item.template_code == 'img_1xn'">
              <div class="component-con"
                   v-draggable:x="{module: item,  dragged: 'dragged'}"
                    >
                <img :src="imageOneOne">
              </div>
            </div>
            <div class="img-2-n" v-if="item.template_code == 'img_2xn'"
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
                  >
              <div class="component-con">
                <img :src="imageOneTwo">
              </div>
            </div>
            <div class="img-3-n" v-if="item.template_code == 'img_3xn'"
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
                  >
              <div class="component-con">
                <img :src="imageOneThree">
              </div>
            </div>
            <div class="img-2-n-1" v-if="item.template_code == 'img_2xn_1'"
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
                  >
              <div class="component-con">
                <img :src="imageOneTwoOne">
              </div>
            </div>
            <div class="img-1xnx3" v-if="item.template_code == 'img_1xnx3'"
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
                  >
              <div class="component-con">
                <img :src="imageOneNThree">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-box" v-if="module.type == 3">
        <h3>商品</h3>
        <div class="clearfix component-box">
          <div class="component-item" v-for="item in module.items">
            <div class="goods-2-n" v-if="item.template_code == 'goods_2xn'" 
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
            >
              <div class="component-con">
                <img :src="goodOneTwo">
              </div>
            </div>
            <div class="goods-3-n" v-if="item.template_code == 'goods_3xn'" 
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
            >
              <div class="component-con">
                <img :src="goodOneThree">
              </div>
            </div>
            <div class="goods-1-n" v-if="item.template_code == 'goods_1xn'" 
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
            >
              <div class="component-con">
                <img :src="good1xn">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="slide-box" v-if="module.type == 1">
        <h3>轮播图</h3>
        <div class="clearfix component-box">
          <div class="component-item" v-for="item in module.items">
            <div class="slide" 
                 v-draggable:x="{module: item,  dragged: 'dragged'}">
              <img :src="slider">
            </div>
          </div>
        </div>
      </div>
      <div class="icons-box" v-if="module.type == 4">
        <h3>Icon</h3>
        <div class="clearfix component-box">
          <div class="component-item" v-for="item in module.items">
            <div class="icons-4-n" 
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
            >
              <div class="component-con">
                <img :src="icon">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-box" v-if="module.type == 5">
        <h3>文本</h3>
        <div class="clearfix component-box">
          <div class="component-item" v-for="item in module.items">
            <div class="text-n" 
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
            >
              <div class="component-con">
                <img :src="text" v-if="item.template_code == 'text'">
                <img :src="textTitle1" v-if="item.template_code == 'text_title_1'">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="slide-box" v-if="module.type == 6">
        <h3>弹窗</h3>
        <div class="clearfix component-box">
          <div class="component-item" v-for="item in module.items">
            <div class="slide" 
                 v-draggable:x="{module: item,  dragged: 'dragged'}">
              <img :src="popup">
            </div>
          </div>
        </div>
      </div>
      <div class="goods-box" v-if="module.type == 7">
        <h3>组合</h3>
        <div class="clearfix component-box">
          <div class="component-item" v-for="item in module.items">
            <div class="group-goods" v-if="item.template_code == 'group_tab_1xn'" 
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
            >
              <div class="component-con">
                <img :src="groupTab1xn">
              </div>
            </div>
            <div class="group-goods-1-n" v-if="item.template_code == 'group_seckill_1xn'" 
                 v-draggable:x="{module: item,  dragged: 'dragged'}"
            >
              <div class="component-con">
                <img :src="groupSeckill1xn">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .moduleslist {
    text-align: left;
    padding-bottom: 20px;
    img {
      width: 50%;
    }
    h3 {
      border-left: solid 5px #8cc69e;
      font-size: 14px;
      padding: 8px;
    }
  }
  .component-box {
    .component-item {
      width: 50%;
      float: left;
      text-align: center;
      margin-bottom: 10px;
    }
  }
</style>
<script>
  import imageOneOne from '../../assets/tpl-image/img_1xn.png'
  import imageOneTwoOne from '../../assets/tpl-image/img_2xn_1.png'
  import imageOneTwo from '../../assets/tpl-image/img_2xn.png'
  import imageOneThree from '../../assets/tpl-image/img_3xn.png'
  import imageOneNThree from '../../assets/tpl-image/img_1xnx3.png'
  import good1xn from '../../assets/tpl-image/goods_1xn.png'
  import goodOneTwo from '../../assets/tpl-image/goods_2xn.png'
  import goodOneThree from '../../assets/tpl-image/goods_3xn.png'
  import slider from '../../assets/tpl-image/slider.png'
  import icon from '../../assets/tpl-image/icon_1x4.png'
  import text from '../../assets/tpl-image/text.png'
  import textTitle1 from '../../assets/tpl-image/text_title_1.png'
  import popup from '../../assets/tpl-image/popup.png'
  import groupTab1xn from '../../assets/tpl-image/group_tab_1xn.png'
  import groupSeckill1xn from '../../assets/tpl-image/group_seckill_1xn.png'
  import {mapActions, mapGetters} from 'vuex'
  import * as types from '../../vuex/mutation-types'
  export default {
    data () {
      return {
        good1xn, goodOneTwo, goodOneThree,
        imageOneOne, imageOneThree, imageOneTwo, imageOneTwoOne, imageOneNThree,
        slider, icon, popup,
        text, textTitle1,
        groupTab1xn, groupSeckill1xn
      }
    },
    computed: {
      ...mapGetters({
        list: types.MODULE_LIST
      }),
      moduleList () {
        return this.list.sort((a, b) => {
          return a.type - b.type
        })
      }
    },
    methods: {
      ...mapActions({
        setModuleList: types.SET_MODULE_LIST
      })
    },
    mounted () {
      this.setModuleList({
        data: {},
        callback: (data) => {
        }
      })
    }
  }
</script>
