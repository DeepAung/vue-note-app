import { computed } from 'vue'
import { store } from './store.ts'

export const useSearchedNotes = () => {
  return computed({
    get() {
      if (store.searchInput == '') return store.notes

      const patterns = store.searchInput.trim().split(/\s+/)

      return store.notes.filter((note) => {
        let title = note.title.toLowerCase()
        let detail = note.detail.toLowerCase()
        return patterns.some(
          (pattern) => title.includes(pattern) || detail.includes(pattern)
        )
      })
    },
    set(newValue) {
      if (store.searchInput != '') return

      store.notes = newValue
      store.saveNotes()
    },
  })
}
