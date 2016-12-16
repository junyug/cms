<template>
  <div class="component-text">
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/text.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
