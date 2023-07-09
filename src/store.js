import { reactive } from 'vue'

export const store = reactive({
  notes: [],
  note: {
    title: '',
    detail: '',
    colorIndex: 0
  },
  searchInput: '',

  loadNotes() {
    if (localStorage.notes) {
      let data = JSON.parse(localStorage.notes)
      this.notes = data
    }
  },

  saveNotes() {
    localStorage.notes = JSON.stringify(this.notes)
  },

  createNote() {
    this.notes.unshift({
      title: this.note.title,
      detail: this.note.detail,
      colorIndex: this.note.colorIndex,
      date: new Date().toLocaleDateString('en-GB')
    })
    this.saveNotes()
  },

  updateNote(index) {
    this.notes[index] = this.note
    this.saveNotes()
  },

  deleteNote(index) {
    this.notes.splice(index, 1)
    this.saveNotes()
  },

  resetNote() {
    this.note = {
      title: '',
      detail: '',
      colorIndex: 0
    }
  }
})
