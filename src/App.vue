<script setup>
import { ref, computed, onMounted } from 'vue'
import { store } from './store.js'

import draggable from 'vuedraggable'
import NoteItem from './components/NoteItem.vue'
import NoteModal from './components/NoteModal.vue'
import SearchBar from './components/SearchBar.vue'

import { useSearch } from './composables/useSearch.js'

// ------------------------------------- //

const showModal = ref(false)
const id = ref(-1)
const drag = ref(false)

const isNew = computed(() => id.value === -1)
const searchedNotes = useSearch()

// ------------------------------------- //

onMounted(() => {
  store.loadNotes()
})

function openNewNoteModal() {
  store.resetNote()
  id.value = -1
  showModal.value = true
}

function openNoteModal(idx) {
  store.note = store.notes[idx]
  id.value = idx
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
  if (isNew.value) {
    showModal.value = false
    return
  }

  store.deleteNote(id.value)
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
  font-size: clamp(1rem, 4vw, 2.5rem);

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
