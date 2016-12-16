<template>
  <div class="component-img-2xn_1">
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/img_2xn_1.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
