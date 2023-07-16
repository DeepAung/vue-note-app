<script setup lang="ts">
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import { colorList } from '../scripts/color.ts'
import { store } from '../scripts/store.ts'

import ColorPalette from './ColorPalette.vue'

const props = defineProps<{
  showModal: boolean
  id: number
}>()

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'update'): void
  (e: 'delete'): void
}>()

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
  <Transition name="show">
    <div v-show="showModal" class="overlay">
      <div
        ref="modal"
        class="modal"
        :style="{ backgroundColor: colorList[store.note.colorIndex] }"
      >
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
            class="detail"
            autofocus
            :style="{ backgroundColor: colorList[store.note.colorIndex] }"
          ></textarea>
        </div>
        <div class="bottom">
          <ColorPalette />
          <p v-if="cannotCreate">please fill in the title</p>
          <div class="wrapper">
            <button
              v-if="isNew"
              :disabled="cannotCreate"
              @click="emit('create')"
              class="create-btn"
            >
              Create
            </button>
            <button v-else @click="emit('update')" class="update-btn">
              Update
            </button>
            <font-awesome-icon
              @click="emit('delete')"
              class="delete-btn"
              icon="fa-solid fa-trash"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.show-enter-active,
.show-leave-active {
  transition: opacity 0.25s cubic-bezier(0, 1, 1, 1);
}

.show-enter-active > *,
.show-leave-active > * {
  transition: transform 0.25s cubic-bezier(0, 1, 1, 1);
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
}

.show-enter-from > *,
.show-leave-to > * {
  transform: scale(0.3);
}

textarea {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-color) var(--scorllbar-bg);
}

textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color);
  border-radius: 1rem;
}

textarea::-webkit-scrollbar-track {
  background-color: var(--scorllbar-bg);
  border-radius: 1rem;
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
  height: 80%;
  z-index: 100;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.modal .top {
  padding: 1.5rem;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
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
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 500;
}

.modal .top .detail {
  flex-grow: 1;
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

.modal .bottom .wrapper > * {
  cursor: pointer;
}

.modal .bottom .wrapper button {
  margin: 0 auto;
  padding: 0.5rem;
  width: min(10rem, 40vw);
  border: none;
  border-radius: 0.4rem;
  font-size: 1.3rem;
  color: var(--color-background-mute);
  background-color: var(--color-heading);
  display: block;
}

.modal .bottom .wrapper .delete-btn {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
