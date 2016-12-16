<template>
  <div class="component-popup">
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/popup.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
