<template>
  <div class="component-img_1xnx3">
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/img_1xnx3.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
