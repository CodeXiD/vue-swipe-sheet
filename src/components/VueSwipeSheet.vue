<template>
  <teleport to="body">
    <div
        v-if="withBackdrop && isOpenSheet"
        class="vite-swipe-sheet-backdrop"
        :style="{ '--backdropColor':  props.backdropColor, '--zIndex': zIndex }"
    />
    <div
        class="vite-swipe-sheet"
        ref="vueSwipeSheetRef"
        :class="{ moving: isMoving, 'with-backdrop': withBackdrop }"
        :style="{
          '--headerHeight':  headerRef?.clientHeight+'px',
          '--offsetTop': (isReady && (positionY === 0 || positionY > 0) ? positionY : windowHeight)+'px',
          '--zIndex': zIndex + 1
        }"
    >
      <div ref="headerRef" class="header">
        <slot name="header">
          <Header />
        </slot>
      </div>

      <div ref="contentRef" class="content">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import Hammer from 'hammerjs';
import Header from "./Header.vue";
import {onMounted, onUnmounted, PropType, ref, watch} from "vue";
import findClosestNumber from "../helpers/findClosestNumber.ts";
import {get, onClickOutside, set, useVModel, useWindowSize} from "@vueuse/core";
import {setPageScrollable} from "../helpers/setPageScrollable.ts";

const emit = defineEmits<{
  (e: 'update:modelValue', isOpen: boolean): void
  (e: 'update:positionY', newPositionY: number): void
  (e: 'pan:start', event: HammerInput): void
  (e: 'pan:move', event: HammerInput): void
  (e: 'pan:end', event: HammerInput): void
}>()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  snapPoints: {
    type: Array as PropType<number[]>,
    default: () => [200, 400]
  },
  isLockScroll: {
    type: Boolean,
    default: true
  },
  startSnapPoint: {
    type: Number,
    default: 200
  },
  withBackdrop: {
    type: Boolean,
    default: true
  },
  backdropColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.3)'
  },
  zIndex: {
    type: Number,
    default: 9999
  },
  isCloseOnOutsideClick: {
    type: Boolean,
    default: false
  }
});

const isOpenSheet = useVModel(props, 'modelValue', emit)

const vueSwipeSheetRef = ref();
const headerRef = ref();
const contentRef = ref();
const { height: windowHeight } = useWindowSize()
const headerHammerManager = ref<HammerManager | null>(null)

// moving
const startMovePositionY = ref(0)
const isReady = ref(false)
const positionY = ref(0)
const isMoving = ref(false)

const setPositionY = (newPositionY: number, isSafe = true) => {
  // if sheet close - block change position
  if(!get(isOpenSheet) && isSafe) return;
  if(isSafe) {
    if(newPositionY < 0) set(positionY, 0)
    else if (newPositionY >= (get(windowHeight) - get(headerRef).clientHeight)) set(positionY, get(windowHeight) - get(headerRef).clientHeight)
    else set(positionY, newPositionY);
  } else {
     set(positionY, newPositionY);
  }

  emit('update:positionY', get(positionY));
}

const setSnapPoint = (snapPoint: number) => {
  if(!get(isOpenSheet)) return;
  setPositionY(get(windowHeight) - snapPoint, false)
}

// if isCloseOnOutsideClick = true and click outside, close the sheet
onClickOutside(vueSwipeSheetRef, () => {
  if(props.isCloseOnOutsideClick) set(isOpenSheet, false)
})

const moveToNearestSnapPoint = (currentPositionY: number) => {
  // Validate span points, change invalid ones to valid ones
  const validSnapPoints = props.snapPoints.map((snapPoint) => {
    if(snapPoint < get(headerRef).clientHeight) return get(headerRef).clientHeight
    else if (snapPoint > get(windowHeight)) return get(windowHeight);
    else return snapPoint;
  })
  const nearbySnapPoint = findClosestNumber(validSnapPoints, get(windowHeight) - currentPositionY)
  if(nearbySnapPoint) setSnapPoint(nearbySnapPoint);
}

watch(isOpenSheet, (newState) => {
  if(newState) {
    setSnapPoint(props.snapPoints[0])
    if(props.isLockScroll) setPageScrollable('auto')
  } else {
    setPositionY(get(windowHeight), false)
    if(props.isLockScroll) setPageScrollable('hidden')
  }
})

onMounted(() => {
  if(props.isLockScroll) setPageScrollable('hidden')

  setSnapPoint(props.startSnapPoint)
  set(isReady, true);

  set(headerHammerManager, new Hammer(get(headerRef)));

  get(headerHammerManager)?.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL })

  get(headerHammerManager)?.on('panup pandown', (event) => {
    emit('pan:move', event)
    setPositionY(event.center.y - 16, true)
  });

  get(headerHammerManager)?.on("panstart", (event) => {
    emit('pan:start', event)
    set(startMovePositionY, event.center.y)
    set(isMoving, true)
  })

  get(headerHammerManager)?.on("panend", (event) => {
    emit('pan:end', event)
    set(isMoving, false)
    setPositionY(event.center.y - 16, true)
    moveToNearestSnapPoint(event.center.y)
  });
})

onUnmounted(() => {
  get(headerHammerManager)?.destroy();
  setPageScrollable('auto')
})

defineExpose({
  positionY,
  setPositionY,
  setSnapPoint
})
</script>

<style scoped>
.vite-swipe-sheet-backdrop {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--zIndex);
  background: var(--backdropColor);
}

.vite-swipe-sheet {
  position: fixed;
  top: var(--offsetTop);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--zIndex);
  background: #fff;
  border-radius: 12px 12px 0 0;
}

.vite-swipe-sheet:not(.moving) {
  transition: top ease-in-out 0.3s;
}

.vite-swipe-sheet .content {
  height: calc(100dvh - var(--offsetTop) - var(--headerHeight));
}
</style>
