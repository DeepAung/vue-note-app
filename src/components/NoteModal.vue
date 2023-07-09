<script setup>
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { colorList } from '../color.js'
import { store } from '../store.js'

import ColorPalette from './ColorPalette.vue'

const props = defineProps(['showModal', 'id'])
const emit = defineEmits(['create', 'update', 'delete'])

const isNew = computed(() => props.id === -1)
const cannotCreate = computed(() => isNew.value && store.note?.title === '')

const modal = ref(null)
onClickOutside(modal, () => {
  if (props.showModal) {
    emit('update')
  }
})
</script>

<template>
  <div v-show="showModal" class="overlay">
    <div ref="modal" class="modal" :style="{ backgroundColor: colorList[store.note.colorIndex] }">
      <div class="top">
        <input
          v-model="store.note.title"
          type="text"
          placeholder="Title"
          class="title"
          :style="{ backgroundColor: colorList[store.note.colorIndex] }"
        />
        <textarea
          v-model="store.note.detail"
          placeholder="Detail Here"
          rows="12"
          class="detail"
          autofocus
          :style="{ backgroundColor: colorList[store.note.colorIndex] }"
        ></textarea>
      </div>
      <div class="bottom">
        <ColorPalette />
        <p v-if="cannotCreate">please fill in the title</p>
        <div class="wrapper">
          <button v-if="isNew" :disabled="cannotCreate" @click="emit('create')" class="create-btn">
            Create
          </button>
          <button v-else @click="emit('update')" class="update-btn">Update</button>
          <font-awesome-icon @click="emit('delete')" class="delete-btn" icon="fa-solid fa-trash" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  height: 16px;
  overflow: visible;
  width: 16px;
}
::-webkit-scrollbar-button {
  height: 0;
  width: 0;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
  border: solid transparent;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.07);
}
::-webkit-scrollbar-track {
  background-clip: padding-box;
  border: solid transparent;
  border-width: 0 0 0 4px;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;

  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 90%;
  max-width: 35rem;
  z-index: 100;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.modal .top {
  padding: 1.5rem;
}

.modal .top * {
  display: block;
  width: 100%;
  border: none;
  outline: none;
  margin: 1rem 0;
  background-color: var(--color-background-mute);
}

.modal .top .title {
  font-size: 3rem;
}

.modal .top .detail {
  resize: none;
}

.modal .bottom {
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
}

.modal .bottom > p {
  color: rgb(202, 0, 0);
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.modal .bottom button {
  cursor: pointer;
  margin: 0 auto;
  padding: 0.5rem;
  width: 10rem;
  border: none;
  border-radius: 0.4rem;
  font-size: 1.3rem;
  color: var(--color-background-mute);
  background-color: var(--color-heading);
  display: block;
}

.modal .bottom > * {
  cursor: pointer;
}

.modal .bottom .delete-btn {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
