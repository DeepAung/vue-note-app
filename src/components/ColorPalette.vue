<script setup lang="ts">
import { store } from '../scripts/store.ts'
import { colorList } from '../scripts/color.ts'
</script>

<template>
  <div class="color-container">
    <button
      v-for="(color, index) in colorList"
      :key="index"
      @click="store.note.colorIndex = index"
      class="color-item"
      :class="{ active: store.note.colorIndex === index }"
      :style="{ backgroundColor: color }"
    ></button>
  </div>
</template>

<style scoped>
.color-container {
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.color-item {
  width: min(2rem, 8vw);
  height: min(2rem, 8vw);
  border: 2px var(--vt-c-text-light-2) solid;
  margin: auto 1vw;
  border-radius: 50%;

  cursor: pointer;
}

.active {
  border: 4px var(--vt-c-text-light-2) solid;
}
</style>
../scripts/color.ts
