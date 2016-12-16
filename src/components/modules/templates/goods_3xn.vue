<template>
  <div class="component-goods_3xn">
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/goods_3xn.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
