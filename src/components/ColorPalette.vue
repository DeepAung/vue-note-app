<script setup>
import { store } from '../store.js'
import { colorList } from '../color.js'

</script>

<template>
  <div class="color-container">
    <button
      v-for="(color, index) in colorList"
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
  width: 2rem;
  height: 2rem;
  border: 2px var(--vt-c-text-light-2) solid;
  margin: auto 0.75rem;
  border-radius: 50%;

  cursor: pointer;
}

.active {
  border: 4px var(--vt-c-text-light-2) solid;
}
</style>
