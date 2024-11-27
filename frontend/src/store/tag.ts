import { defineStore } from 'pinia'
import { useApiFetch } from '@/composables/useApi'
import { TagDto } from '@/types/tag'

export const useTagStore = defineStore('tag', {
  state: () => {
    return {
      tags: [] as TagDto[],
      isLoading: false,
      error: null as string | null,
    }
  },

  getters: {
    getAllTags: (state) => state.tags,
    getTagById: (state) => (id: string) =>
      state.tags.find((tag) => tag.id === id),
  },

  actions: {
    async fetchTags() {
      this.isLoading = true
      this.error = null
      try {
        const { response, data } = await useApiFetch('tag').get().json()
        if (response.value?.status === 200) {
          this.tags = data.value
        } else {
          this.error = `Error fetching tags: ${
            response.value?.statusText || 'Unknown error'
          }`
        }
      } catch (err) {
        this.error = `Error fetching tags: ${
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          err.message || 'Unknown error'
        }`
      } finally {
        this.isLoading = false
      }
    },
    async addTag(tag: TagDto) {
      this.isLoading = true
      try {
        const { response, data } = await useApiFetch('tag')
          .post(tag)
          .json()
        console.log('Response:', data)
        console.log('Rsponse:', data.value)

        if (response.value?.ok) {
          this.tags.push(data.value)
          await this.fetchTags()
        } else {
          console.error('Failed to create tag:', response.value?.statusText)
        }
      } catch (error) {
        console.error('Error creating tag:', error)
      } finally {
        this.isLoading = false
      }
    },
    async removeTag(tagId: string) {
      this.isLoading = true
      try {
        const { response } = await useApiFetch(`tag/${tagId}`)
          .delete()
          .json()
        if (response.value?.ok) {
          this.tags = this.tags.filter(
            (tag) => tag.id !== tagId
          )
          await this.fetchTags()
        } else {
          console.error('Failed to delete tag:', response.value?.statusText)
        }
      } catch (error) {
        console.error('Error deleting tag:', error)
      } finally {
        this.isLoading = false
      }
    },
    updateTag(updatedTag: TagDto) {
      const index = this.tags.findIndex(
        (tag) => tag.id === updatedTag.id
      )
      if (index !== -1) {
        this.tags.splice(index, 1, updatedTag)
      }
    },
  },
})
