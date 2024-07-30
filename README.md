# Vue Swipe Sheet
Vue3 bottom swipe sheet

<p align="center">
    <img src="https://github.com/CodeXiD/vue-swipe-sheet/raw/main/resources/header.png" width="500">
</p>

<p align="center">
    <img src="https://img.shields.io/github/license/codexid/vue-swipe-sheet?style=flat-square" />
    <img alt="npm" src="https://img.shields.io/npm/dm/vue-swipe-sheet?style=flat-square">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/codexid/vue-swipe-sheet?style=flat-square">
    <img alt="npm" src="https://img.shields.io/npm/v/vue-swipe-sheet?style=flat-square">
</p>

## 🤝 Demo
[👉 Demo here](https://stackblitz.com/edit/vue-swipe-sheet-demo?file=src%2FApp.vue)

## 📦 Installation
### yarn
`yarn add vue-swipe-sheet`

### npm
`npm i vue-swipe-sheet`

## 🔧 Simple usage
```js
import VueSwipeSheet from "vue-swipe-sheet";
import "vue-swipe-sheet/style.css"

const isOpenSheet = ref(true)
```

```vue
<VueSwipeSheet v-model="isOpenSheet">
    <div>
        <h2>Here should be some content</h2>
    </div>
</VueSwipeSheet>
```

## 📋 Props

| Property              |   Type   |      Default       | Description                                                                                                                                                               |
|-----------------------|:--------:|:------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| modelValue            | boolean  |        true        | State, whether the sheet is currently open                                                                                                                                |
| snapPoints            | number[] |     [200, 400]     | An array of sheet heights at which it will stick                                                                                                                          |
| isLockScroll          | boolean  |        true        | Lock external scroll                                                                                                                                                      |
| startSnapPoint        |  number  |        200         | Starting sheet height upon initialization                                                                                                                                 |
| withBackdrop          | boolean  |        true        | Specifies whether to display backdrop                                                                                                                                     |
| backdropColor         |  string  | rgba(0, 0, 0, 0.3) | Backdrop color                                                                                                                                                            |
| zIndex                |  number  |        9999        | z-index for the background, for the sheet itself the z-index is z-index + 1, can be useful if you need to have several sheets at the same time, and adjust their sequence |
| isCloseOnOutsideClick | boolean  |       false        | Whether to close a sheet when clicking outside of it                                                                                                                      |


## 🔧 Event
| Name              | Payload              | Description                                                 |
|-------------------|----------------------|-------------------------------------------------------------|
| update:modelValue | newState: boolean    | Called when the open state of a sheet changes               |
| update:positionY  | newPositionY: number | Called whenever there is a change in position relative to Y |
| pan:start         | event: HammerInput   | Called when pan starts                                      |
| pan:move          | event: HammerInput   | Called by the pan process                                   |
| pan:end           | event: HammerInput   | Called when pan ends                                        |


## 🎯 External manipulation
You can access the component via Ref and interact with such variables and values

| Name         | Type                         | Description                                                         |
|--------------|------------------------------|---------------------------------------------------------------------|
| positionY    | Ref < number >               | Current offset from top                                             |
| setPositionY | (newPositionY: number): void | Change offset from top                                              |
| setSnapPoint | (newSnapPoint: number): void | A function similar to setPositionY but sets the height of the popup |


## 💫 Additional example
```vue
<template>
  <div>
    <button @click="() => setStateOpenSwipeSheet(false)">Close swipe sheet</button>
    <button @click="() => setStateOpenSwipeSheet(true)">Open swipe sheet</button>
    <button @click="() => setVueSwipeSheetSnapPoint(700)">Set sheet snap point to 700</button>

    <VueSwipeSheet
        ref="vueSwipeSheetRef"
        v-model="isOpenSheet"
        :start-snap-point="300"
        :snap-points="[100, 300, 600, 810]"
    >
      <div>
        <h2>Here should be some content </h2>
        <p>Cur rumor cadunt? Nunquam perdere pulchritudine.</p>
      </div>
    </VueSwipeSheet>
  </div>
</template>


<script setup lang="ts">
  import {ref} from "vue";
  import VueSwipeSheet from "vue-swipe-sheet";
  import "vue-swipe-sheet/style.css"
  
  const vueSwipeSheetRef = ref<typeof VueSwipeSheet>()
  const isOpenSheet = ref(true)

  const setVueSwipeSheetSnapPoint = (newSnapPoint: number) => {
    vueSwipeSheetRef.value.setSnapPoint(newSnapPoint)
  }
  const setStateOpenSwipeSheet = (newState: boolean) => {
    isOpenSheet.value = newState
  }
</script>
```
