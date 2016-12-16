<template>
  <div class="component-img-3xn">
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/img_3xn.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
