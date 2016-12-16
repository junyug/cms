<template>
  <div class="component-icon-1x4">
    <a class="btn-delete"></a>
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/icon_1x4.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
