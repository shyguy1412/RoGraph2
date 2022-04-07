<template>
  <rg-instruction-block
    ref="el"
    @mousedown.left="pickUpBlock"
    class="instruction-block-wrapper"
    :style="cssProps"
  >
  </rg-instruction-block>
</template>

<script lang="ts">
import { InstructionBlockSVG } from "../svg/InstuctionBlockSVG";
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
  mounted: function () {
    for(let i = 0; i < 2000; i++){
      new InstructionBlockSVG(this.$el);
    }
  },
  methods: {
    pickUpBlock: function (e: MouseEvent) {
      console.log("PICKUP");

      const canvas = document.querySelector("rg-canvas") as HTMLElement;

      this.offset.x = e.offsetX + canvas.offsetLeft;
      this.offset.y = e.offsetY + canvas.offsetTop;

      canvas.appendChild(this.$el);

      document.body.addEventListener("mousemove", this.followMouse);
      document.addEventListener("mouseup", this.dropBlock);
    },
    dropBlock: function (e: MouseEvent) {
      console.log("DROP");
      document.body.removeEventListener("mousemove", this.followMouse);
      document.removeEventListener("mouseup", this.dropBlock);

      //delete block if outside on the left
      if (this.pos.x < 0) this.deleteBlock();
    },
    followMouse: function (e: MouseEvent) {
      this.pos.x = e.clientX - this.offset.x;
      this.pos.y = e.clientY - this.offset.y;
    },
    deleteBlock: function () {
      const el = this.$el as HTMLElement;
      el.remove();
    },
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
  display: block;
  position: absolute;
  width: max-content;
  height: max-content;
  left: calc(var(--pos-x) * 1px);
  top: calc(var(--pos-y) * 1px);
  /* border: 2px solid darkblue;
  background: darkcyan; */
}
</style>
