<template>
  <div class="component-good-1x2">
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/goods_2xn.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
