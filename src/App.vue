<template>
  <div id="app">
    <h3>动态级联</h3>
    <dynamic-cascader />
  </div>
</template>

<script>
import DynamicCascader from './views/DynamicCascader/index.vue';
export default {
  components: {
    DynamicCascader
  },
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>