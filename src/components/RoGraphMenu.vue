<template>
  <rg-menu>
    <slot></slot>
  </rg-menu>
</template>

<script lang=ts>
export default {
  name: "",
  data: function () {
    return {};
  },
  methods: {
  },
};
</script>

<style scoped>
rg-menu {
  display: block;
  width: 100%;
  height: 100%;
  background: lightsalmon;
}
</style>