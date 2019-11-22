<template>
  <div id="app">
    <h2>欢迎使用项目模板！</h2>
    <img src="./assets/logo.jpg" alt="" srcset="" />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {}
  }
}
</script>
<style scoped>
h2 {
  color: red;
}
</style>
<style lang="scss" scoped>
$color: lightgreen;
$bg: lightblue;
h2 {
  color: $color;
  background: $bg;
  transform: translateX(100px);
}
</style>
