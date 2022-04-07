<script setup lang="ts">
import InstructionBlock from "./components/InstructionBlock.vue";
import RoGraphCanvas from "./components/RoGraphCanvas.vue";
import RoGraphMenu from "./components/RoGraphMenu.vue";
</script>

<template>
  <RoGraphMenu></RoGraphMenu>
  <RoGraphCanvas>
    <InstructionBlock></InstructionBlock>
  </RoGraphCanvas>
</template>

<style>

#app {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 300px auto;
}

#app,
html,
body {
  width: 100%;
  height: 100%;
}

html {
  overflow: hidden;
}

body {
  margin: 0;
}
</style>
