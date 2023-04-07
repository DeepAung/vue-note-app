<script setup>
import { ref, computed, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { store } from './store.js'

import NoteItem from './components/NoteItem.vue'
import NoteModal from './components/NoteModal.vue'
import SearchBar from './components/SearchBar.vue'

const showModal = ref(false)
const id = ref(-1)
const drag = ref(false)

const isNew = computed(() => id.value === -1)

const searchedNotes = computed({
  get() {
    if (store.searchInput == '') return store.notes

    const patterns = store.searchInput.trim().split(/\s+/)

    return store.notes.filter((note) => {
      let title = note.title.toLowerCase()
      let detail = note.detail.toLowerCase()
      return patterns.some((pattern) => title.includes(pattern) || detail.includes(pattern))
    })
  },
  set(newValue) {
    if (store.searchInput != '') return

    store.notes = newValue
    store.saveNotes()
  }
})

onMounted(() => {
  store.getNotes()
})

function gonnaCreateNote() {
  store.resetNote()
  id.value = -1
  showModal.value = true
}

function gonnaUpdateNote(idx) {
  store.note = store.notes[idx]
  id.value = idx
  showModal.value = true
}

function createNote() {
  store.notes.unshift({
    title: store.note.title,
    detail: store.note.detail,
    colorIndex: store.note.colorIndex,
    date: new Date().toLocaleDateString('en-GB')
  })
  store.saveNotes()
  showModal.value = false
}

function updateNote() {
  store.notes[id.value] = store.note
  store.saveNotes()
  showModal.value = false
}

function deleteNote() {
  if (isNew.value) {
    showModal.value = false
    return
  }

  store.notes.splice(id.value, 1)
  store.saveNotes()
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
      <h1>Vue Note App</h1>
      <SearchBar />
      <button @click="gonnaCreateNote">+</button>
    </div>
    <draggable
      class="note-container"
      v-model="searchedNotes"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element, index }">
        <NoteItem v-on:click.native="gonnaUpdateNote(index)" :note="element" />
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
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 2rem;
}
</style>
