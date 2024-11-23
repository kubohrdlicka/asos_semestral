import { defineStore } from 'pinia'
import { useApiFetch } from '@/composables/useApi'

export const useEntryStore = defineStore('entry', {
  state: () => ({
    entries: [] as Entry[],
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    getEntries: (state) => state.entries,
    getEntryById: (state) => (id: number) =>
      state.entries.find((entry) => entry.id === id),
    getEntriesByStatus: (state) => (status: string) =>
      state.entries.filter((entry) => entry.status === status),
  },

  actions: {
    async fetchEntries() {
      this.isLoading = true
      this.error = null
      try {
        const { response, data } = await useApiFetch('entries').get().json()
        if (response.value?.status === 200) {
          this.entries = data.value
        } else {
          this.error = data.value?.message || 'Failed to fetch entries'
        }
      } catch (err) {
        this.error = 'An unexpected error occurred'
      } finally {
        this.isLoading = false
      }
    },

    async addEntry(newEntry: Entry) {
      this.isLoading = true
      this.error = null
      try {
        const { response, data } = await useApiFetch('entries')
          .post(newEntry)
          .json()
        if (response.value?.status === 201) {
          this.entries.push(data.value)
        } else {
          this.error = data.value?.message || 'Failed to add entry'
        }
      } catch (err) {
        this.error = 'An unexpected error occurred'
      } finally {
        this.isLoading = false
      }
    },

    async updateEntry(updatedEntry: Entry) {
      this.isLoading = true
      this.error = null
      try {
        const { response, data } = await useApiFetch(
          `entries/${updatedEntry.id}`
        )
          .put(updatedEntry)
          .json()
        if (response.value?.status === 200) {
          const index = this.entries.findIndex(
            (entry) => entry.id === updatedEntry.id
          )
          if (index !== -1) {
            this.entries[index] = data.value
          }
        } else {
          this.error = data.value?.message || 'Failed to update entry'
        }
      } catch (err) {
        this.error = 'An unexpected error occurred'
      } finally {
        this.isLoading = false
      }
    },

    async deleteEntry(id: number) {
      this.isLoading = true
      this.error = null
      try {
        const { response } = await useApiFetch(`entries/${id}`).delete().json()
        if (response.value?.status === 200) {
          this.entries = this.entries.filter((entry) => entry.id !== id)
        } else {
          this.error = 'Failed to delete entry'
        }
      } catch (err) {
        this.error = 'An unexpected error occurred'
      } finally {
        this.isLoading = false
      }
    },
  },
})

// Entry type definition
interface Entry {
  id: number
  ownerId: number
  type: 'Note' | 'Task'
  name: string
  tagId?: number
  priority?: string
  description?: string
  deadline?: string
  status?: 'Done' | 'InProgress'
  color?: string
  iconName?: string
  createdAt?: string
  updatedAt?: string
}
