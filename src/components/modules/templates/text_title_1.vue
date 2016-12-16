<template>
  <div class="component-text_title_1">
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/text_title_1.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
