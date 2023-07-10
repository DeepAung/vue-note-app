<script setup>
import { colorList } from '../color.js'

// eslint-disable-next-line no-unused-vars
const props = defineProps(['note'])
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
  position: relative;
}

.card .wrapper {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card .wrapper .title {
  font-weight: bold;
}

.card .wrapper .detail {
  white-space: pre-line;
  overflow: hidden;
  flex-grow: 1;

  -webkit-mask-image: linear-gradient(var(--color-text) 70%, transparent 95%);
}
</style>
