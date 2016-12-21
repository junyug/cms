<template>
  <div class="component-text_title_1">
    <edit-component ref="editComponent" :is-edit="isEdit" :module="module"></edit-component>
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/text_title_1.png'
  import EditComponent from './edit_component'
  export default {
    props: ['id', 'module'],
    computed: {
      isEdit () {
        return this.id == this.module.id
      }
    },
    data () {
      return {
        imgUrl: previewUrl
      }
    },
    components: {
      EditComponent
    }
  }
</script>
