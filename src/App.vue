<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { store } from './store.ts'

import draggable from 'vuedraggable'
import NoteItem from './components/NoteItem.vue'
import NoteModal from './components/NoteModal.vue'
import SearchBar from './components/SearchBar.vue'

import { useSearchedNotes } from './composables/useSearch.ts'

// ------------------------------------- //

const showModal = ref(false)
const id = ref(-1)
const drag = ref(false)

const isNew = computed(() => id.value === -1)
const searchedNotes = useSearchedNotes()

onMounted(() => {
  store.loadNotes()
})

// ------------------------------------- //

function openNewNoteModal() {
  store.resetNote()
  id.value = -1
  showModal.value = true
}

function openNoteModal(index: number) {
  store.note = store.notes[index]
  id.value = index
  showModal.value = true
}

function createNote() {
  store.createNote()
  showModal.value = false
}

function updateNote() {
  store.updateNote(id.value)
  showModal.value = false
}

function deleteNote() {
  if (!isNew.value) {
    store.deleteNote(id.value)
  }

  showModal.value = false
}
</script>

<template>
  <NoteModal
    :showModal="showModal"
    :id="id"
    @create="createNote"
    @update="updateNote"
    @delete="deleteNote"
  />

  <div class="container">
    <div class="header">
      <h1>Let's Note &#128075;</h1>
      <SearchBar />
      <button @click="openNewNoteModal">+</button>
    </div>

    <draggable
      class="note-container"
      v-model="searchedNotes"
      delay="400"
      delayOnTouchOnly="true"
      chosenClass="chosen-note"
      @start="drag = true"
      @end="drag = false"
      itemKey="id"
    >
      <template #item="{ element, index }">
        <NoteItem v-on:click="openNoteModal(index)" :note="element" />
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.chosen-note {
  filter: opacity(0.75);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(0.5rem, 4vw, 2rem);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-weight: bold;
  cursor: pointer;
}

.header button {
  width: clamp(2rem, 4vw, 3rem);
  height: clamp(2rem, 4vw, 3rem);

  border-radius: 50%;
  border: none;
  cursor: pointer;

  font-size: clamp(1.25rem, 3vw, 2.5rem);
  color: var(--color-background-mute);
  background-color: var(--color-heading);
}

.note-container {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 2rem;
}
</style>
