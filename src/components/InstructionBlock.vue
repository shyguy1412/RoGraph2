<template>
  <rg-instruction-block :style="cssProps"></rg-instruction-block>
</template>

<script lang="ts">
import { InstructionBlockSVG } from "../svg/InstuctionBlockSVG";
export default {
  name: "InstructionBlock",
  data: function () {
    return {};
  },
  mounted: function () {
    this.$el.append(InstructionBlockSVG.create());
    console.log('Istruction created');
    
  },
  methods: {},
  computed: {
    cssProps: function (): Object {
      return {};
    },
  },
};
</script>

<style lang="css" scoped>
rg-instruction-block {
  display: block;
  position: relative;
}


rg-instruction-block:nth-child(n+2){
    top: calc(var(--offset-y) * 1px)
}
</style>
