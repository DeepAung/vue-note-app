import { reactive } from 'vue'

export const store = reactive({
  notes: [],
  getNotes() {
    if (localStorage.notes) {
      let data = JSON.parse(localStorage.notes)
      this.notes = data
    }
  },
  saveNotes() {
    localStorage.notes = JSON.stringify(this.notes)
  },

  note: {
    title: '',
    detail: '',
    colorIndex: 0,
    date: ''
  },
  resetNote() {
    this.note = {
      title: '',
      detail: '',
      colorIndex: 0,
      date: ''
    }
  },

  searchInput: '',
})
