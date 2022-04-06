<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import InstructionBlock from "./components/InstructionBlock.vue";
import RoGraphCanvas from "./components/RoGraphCanvas.vue";
</script>

<template>
  <RoGraphCanvas>
    <InstructionBlock></InstructionBlock>
  </RoGraphCanvas>
</template>

<style>
#app,
html,
body {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
}
</style>
