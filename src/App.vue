<template>
  <div>
    <h1>Demo vue-swipe-sheet</h1>

    <div>
      <button @click="() => setStateOpenSwipeSheet(false)">Close swipe sheet</button>
      <button @click="() => setStateOpenSwipeSheet(true)">Open swipe sheet</button>
    </div>

    <button @click="() => setVueSwipeSheetSnapPoint(700)">Set sheet snap point to 700</button>

    <vue-swipe-sheet ref="vueSwipeSheetRef" v-model="isOpenSheet" :snap-points="[100, 300, 600, 810]" :z-index="999">
      <div class="my-own-content">
        <h2>Some title</h2>
        <p>Peritus, nobilis impositios velox captis de primus, camerarius abactus. Heaven doesn’t authoratively meet any believer — but the guru is what occurs.</p>
        <p>Zucchini combines greatly with minced walnut. Crushed garlic can be made delicious by whisking with oyster sauce.</p>
      </div>
    </vue-swipe-sheet>
  </div>
</template>

<script setup lang="ts">
import VueSwipeSheet from "./components/VueSwipeSheet.vue";
import {ref} from "vue";
import {get, set} from "@vueuse/core";
const vueSwipeSheetRef = ref<typeof VueSwipeSheet>()

const isOpenSheet = ref(true)

const setVueSwipeSheetSnapPoint = (newSnapPoint: number) => {
  get(vueSwipeSheetRef).setSnapPoint(newSnapPoint)
}
const setStateOpenSwipeSheet = (newState: boolean) => {
  set(isOpenSheet, newState)
}
</script>

<style scoped>
.my-own-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  color: #1a1a1a;
  box-sizing: border-box;
  padding: 0 12px 18px 12px;
}
</style>
