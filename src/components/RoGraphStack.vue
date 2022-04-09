<template>
  <rg-stack
    @mousedown.left="pickUpStack"
    @mouseup.left="dropStack"
    :style="cssProps"
  >
    <slot></slot>
  </rg-stack>
</template>

<script lang=ts>
import { createApp } from 'vue'
export default {
  name: "",
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
    pickUpStack: function (e: MouseEvent) {
      console.log("PICKUP");
      if(!e.composedPath().includes(this.$el.firstElementChild)){
          //the picked up block isnt the head of the stack. separate the block and build a new stack with its children
          const newStack = createApp(this.);
          newStack.mount('rg-canvas');
          console.log('MOUNTED');
          return;
      }

    //   const canvas = document.querySelector("rg-canvas") as HTMLElement;

    //   this.offset.x = e.offsetX + canvas.offsetLeft;
    //   this.offset.y = e.offsetY + canvas.offsetTop;

    //   canvas.appendChild(this.$el);
    //   document.body.addEventListener("mousemove", this.followMouse);
    },
    dropStack: function (e: MouseEvent) {
      console.log("DROP");
      document.body.removeEventListener("mousemove", this.followMouse);

      //delete stack if outside on the left
      if (this.pos.x < 0) this.deleteStack();
    },
    followMouse: function (e: MouseEvent) {
      this.pos.x = e.clientX - this.offset.x;
      this.pos.y = e.clientY - this.offset.y;
    },
    deleteStack: function () {
      const el = this.$el as HTMLElement;
      el.remove();
    },
  },
  computed: {
    cssProps: function (): Object {
      return {
        "--pos-x": this.pos.x,
        "--pos-y": this.pos.y,
        "--offset-y": -15,
      };
    },
  },
};
</script>

<style scoped>
rg-stack {
  display: block;
  position: absolute;
  left: calc(var(--pos-x) * 1px);
  top: calc(var(--pos-y) * 1px);
  /* border: 2px solid darkblue;
  background: darkcyan; */
}

</style>