<template>
  <section id="pageedit">
    <h1>{{title}}</h1>
  </section>
</template>
<style lang="scss">
  h1 {
    text-align: center;
  }
</style>
<script>
  export default {
    name: 'pageEdit',
    data () {
      return {
        title: '编辑页面'
      }
    }
  }
</script>
