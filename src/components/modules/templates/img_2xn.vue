<template>
  <div class="component-img-2xn">
    <edit-component ref="editComponent" :is-edit="isEdit" :module="module"></edit-component>
    <div class="img-item">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import previewUrl from '../../../assets/tpl-image/img_2xn.png'
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
