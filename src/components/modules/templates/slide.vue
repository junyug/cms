<template>
  <div class="component-slide">
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/slider.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
