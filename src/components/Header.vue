<template>
  <div class="vite-swipe-sheet-header">
    <div class="line" />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.vite-swipe-sheet-header {
  position: relative;
  height: 28px;
}

.vite-swipe-sheet-header > .line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28px;
  height: 4px;
  background: gray;
  border-radius: 6px;
}
</style>
