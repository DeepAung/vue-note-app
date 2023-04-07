<script setup>
import { colorList } from '../color.js'

defineProps({
  note: Object
})

</script>

<template>
  <div class="card" :style="{ backgroundColor: colorList[note.colorIndex] }">
    <div class="wrapper">
      <h3 class="title">{{ note.title }}</h3>
      <p class="detail">{{ note.detail }}</p>
    </div>
    <p class="date">{{ note.date }}</p>
  </div>
</template>

<style scoped>
.card {
  height: 15rem;
  cursor: pointer;

  padding: 1rem;
  border-radius: 0.75rem;
  border: none;

  color: var(--color-heading);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card .wrapper .title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
