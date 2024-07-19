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
        <h1>Some title</h1>
        <p>Peritus, nobilis impositios velox captis de primus, camerarius abactus. Heaven doesn’t authoratively meet any believer — but the guru is what occurs.</p>
        <p>Zucchini combines greatly with minced walnut. Crushed garlic can be made delicious by whisking with oyster sauce.</p>
      </div>
    </vue-swipe-sheet>

    <vue-swipe-sheet ref="secondVueSwipeSheetRef" v-model="isOpenSecondSheet" :snap-points="[300, 600]" :z-index="9999">
      <div class="my-own-content">
        <h1>Second swipe sheet</h1>
        <p>Domesticus zirbus velox manifestums cobaltum est. Sunt galataees desiderium peritus, bi-color paluses.</p>
        <p>Resist, scotty. Aw, yer not trading me without a death! Our fraternal dogma for ascension is to visualize others balanced.</p>
        <p>Career is not holographic in hell, the honorable world, or space, but everywhere.</p>
      </div>
    </vue-swipe-sheet>
  </div>
</template>

<script setup lang="ts">
import VueSwipeSheet from "./components/VueSwipeSheet.vue";
import {onMounted, ref} from "vue";
import {get, set} from "@vueuse/core";
const vueSwipeSheetRef = ref<typeof VueSwipeSheet>()

const isOpenSheet = ref(true)
const isOpenSecondSheet = ref(true)

onMounted(() => {
  console.log('### vueSwipeSheetRef', vueSwipeSheetRef)
})

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
}
</style>
