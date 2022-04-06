<template>
   <div
   draggable="true"
   @drag="drag"
   @dragstart="dragstart"
   class="instruction-block-wrapper"
   :style="cssProps">
</div>
</template>

<script lang="ts">
export default {
   name: 'InstructionBlock',
   props: {

   },
   data: function() {
      return {
         pos: {
            x: 0,
            y: 0
         }
      };
   },
   methods: {
      drag: function(e:Event) {
      },
      dragstart: function(e:Event) {
         const img = new Image();
         img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
         //hide dragging ghost
         e.dataTransfer.setDragImage(img, 10, 10);
         e.target.style.cursor = 'pointer';
         e.dataTransfer.effectAllowed = "move";
      },
   },
   mounted: function() {
      window.pos = this.pos;
   },
   computed: {
      cssProps: function(){
         return{
            '--pos-x': this.pos.x,
            '--pos-y': this.pos.y
         }
      }
   },

}
</script>

<style lang="css" scoped>

.instruction-block-wrapper{
   position: absolute;
   width: 100px;
   height: 100px;
   left: calc(var(--pos-x) * 1px);
   top: calc(var(--pos-y) * 1px);
   background: red;
}

</style>
