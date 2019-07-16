<template>
  <div id="app">
    <h2>test!!!</h2>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
<style>
h2 {
  color: red;
}
</style>
<style lang="scss">
$black: black;
$yellow: yellow;
h2 {
  background: $yellow;
  border: 1px solid $black;
  transform: rotate(30deg);
}
</style>
