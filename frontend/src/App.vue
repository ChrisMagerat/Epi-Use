<template>
  <div>
    <createWorker />
    <searchWorker />
    <updateWorker />
    <deleteWorker />
  </div>
</template>

<script>
import createWorker from './components/createWorker.vue'
import searchWorker from './components/searchWorker.vue'
import updateWorker from './components/updateWorker.vue'
import deleteWorker from './components/deleteWorker.vue'
export default {
  name: 'App',
  components: {
    createWorker,
    searchWorker,
    updateWorker,
    deleteWorker
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
