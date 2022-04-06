<template>
  <rg-canvas @dragover="dragover">
    <slot></slot>
  </rg-canvas>
</template>

<script lang=ts>
export default {
  name: "",
  data: function () {
    return {};
  },
  methods: {
    dragover: function (e: DragEvent) {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "move";
    },
  },
};
</script>

<style scoped>
rg-canvas {
  width: 100%;
  height: 100%;
}
</style>