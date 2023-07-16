import { reactive } from 'vue'
import { Note } from '../types/note.ts'

type StoreType = {
  notes: Note[]
  note: Note
  searchInput: string

  loadNotes(): void
  saveNotes(): void
  createNote(): void
  updateNote(index: number): void
  deleteNote(index: number): void
  resetNote(): void
}

export const store = reactive<StoreType>({
  notes: [],
  note: {
    title: '',
    detail: '',
    colorIndex: 0,
    date: ''
  },
  searchInput: '',

  loadNotes() {
    if (!localStorage.notes) return

    this.notes = JSON.parse(localStorage.notes)
  },

  saveNotes() {
    localStorage.notes = JSON.stringify(this.notes)
  },

  createNote() {
    this.notes.unshift({ ...this.note, date: new Date().toLocaleDateString('en-GB') })
    this.saveNotes()
  },

  updateNote(index: number) {
    this.notes[index] = this.note
    this.saveNotes()
  },

  deleteNote(index: number) {
    this.notes.splice(index, 1)
    this.saveNotes()
  },

  resetNote() {
    this.note = {
      title: '',
      detail: '',
      colorIndex: 0,
      date: ''
    }
  }
})
