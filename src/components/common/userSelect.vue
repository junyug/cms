<template>
  <el-select v-model="value" @change='userTypeChange'>
    <el-option v-for="type in userTypes" :label="type.text" :value="type.value" ></el-option>
  </el-select>
</template>
<script>
  const userTypes = require('../../data/userTypes.json').data
  const userTypesUser = require('../../data/userTypesUser.json').data
  export default {
    props: [
      'selected',
      'datatype'
    ],
    data () {
      return {
        value: this.selected,
        userTypes: userTypes
      }
    },
    methods: {
      userTypeChange () {
        this.$emit('userTypeChange', this.value)
      }
    },
    mounted () {
      if (!this.datatype) {
        this.userTypes = userTypes
      } else {
        this.userTypes = userTypesUser
      }
    }
  }
</script>

