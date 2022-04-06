<template>
  <rg-instruction-block
    draggable="true"
    @drag="drag"
    @dragstart="dragstart"
    @dragover="dragover"
    class="instruction-block-wrapper"
    :style="cssProps"
  ></rg-instruction-block>
</template>

<script lang="ts">
export default {
  name: "InstructionBlock",
  data: function () {
    return {
      pos: {
        x: 0,
        y: 0,
      },
      offset: {
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    drag: function (e: DragEvent) {
      this.pos.x = e.clientX - this.offset.x;
      this.pos.y = e.clientY - this.offset.y;
    },
    dragstart: function (e: DragEvent) {
      const img = new Image();
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      //hide dragging ghost
      e.dataTransfer!.setDragImage(img, 10, 10);
      e.dataTransfer!.effectAllowed = "move";
      this.offset.x = e.offsetX;
      this.offset.y = e.offsetY;
    },
    dragover: function (e: DragEvent) {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "move";
    },
  },
  mounted: function () {
    (window as any).pos = this.pos;
  },
  computed: {
    cssProps: function (): Object {
      return {
        "--pos-x": this.pos.x,
        "--pos-y": this.pos.y,
      };
    },
  },
};
</script>

<style lang="css" scoped>
rg-instruction-block {
  position: absolute;
  width: 100px;
  height: 100px;
  left: calc(var(--pos-x) * 1px);
  top: calc(var(--pos-y) * 1px);
  background: blue;
}
</style>
