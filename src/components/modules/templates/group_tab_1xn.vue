<template>
  <div class="component-good-tab">
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/group_tab_1xn.png'
  export default {
    data () {
      return {
        imgUrl: previewUrl
      }
    }
  }
</script>
