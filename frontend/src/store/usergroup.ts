import { defineStore } from 'pinia'
import { useApiFetch } from '@/composables/useApi'
import { UserGroupDto } from '@/types/usergroup'
import { GetUserDto } from '@/types/user'

export const useUserGroupStore = defineStore('userGroup', {
  state: () => {
    return {
      userGroups: [] as UserGroupDto[],
      isLoading: false,
      error: null as string | null,
    }
  },

  getters: {
    getAllUserGroups: (state) => state.userGroups,
    getUserGroupById: (state) => (id: string) =>
      state.userGroups.find((group) => group.id === id),
  },

  actions: {
    async fetchUserGroups() {
      this.isLoading = true
      this.error = null
      try {
        const { response, data } = await useApiFetch('usergroup').get().json()
        if (response.value?.status === 200) {
          this.userGroups = data.value
        } else {
          this.error = `Error fetching user groups: ${
            response.value?.statusText || 'Unknown error'
          }`
        }
      } catch (err) {
        this.error = `Error fetching user groups: ${
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          err.message || 'Unknown error'
        }`
      } finally {
        this.isLoading = false
      }
    },
    async addUserGroup(userGroup: UserGroupDto) {
      this.isLoading = true
      try {
        const { response, data } = await useApiFetch('usergroup')
          .post(userGroup)
          .json()
        console.log('Response:', data)
        console.log('Rsponse:', data.value)

        if (response.value?.ok) {
          this.userGroups.push(data.value)
          await this.fetchUserGroups()
        } else {
          console.error('Failed to create group:', response.value?.statusText)
        }
      } catch (error) {
        console.error('Error creating group:', error)
      } finally {
        this.isLoading = false
      }
    },
    async removeUserGroup(groupId: string) {
      this.isLoading = true
      try {
        const { response } = await useApiFetch(`usergroup/${groupId}`)
          .delete()
          .json()
        if (response.value?.ok) {
          this.userGroups = this.userGroups.filter(
            (group) => group.id !== groupId
          )
          await this.fetchUserGroups()
        } else {
          console.error('Failed to delete group:', response.value?.statusText)
        }
      } catch (error) {
        console.error('Error deleting group:', error)
      } finally {
        this.isLoading = false
      }
    },
    async joinUserGroup(joinCode: string) {
      this.isLoading = true
      try {
        const { response, data } = await useApiFetch(`usergroup/${joinCode}`)
          .post()
          .json()
        if (response.value?.ok) {
          this.userGroups.push(data.value)
          this.fetchUserGroups()
        } else {
          console.error('Failed to join group:', response.value?.statusText)
        }
      } catch (error) {
        console.error('Error joining group:', error)
      } finally {
        this.isLoading = false
      }
    },
    async leaveUserGroup(groupId: string) {
      this.isLoading = true
      try {
        const { response } = await useApiFetch(`usergroup/${groupId}/me`)
          .delete()
          .json()
        if (response.value?.ok) {
          this.userGroups = this.userGroups.filter((g) => g.id !== groupId)
          await this.fetchUserGroups()
        } else {
          console.error('Failed to leave group:', response.value?.statusText)
        }
      } catch (error) {
        console.error('Error leaving group:', error)
      } finally {
        this.isLoading = false
      }
    },
    updateUserGroup(updatedGroup: UserGroupDto) {
      const index = this.userGroups.findIndex(
        (group) => group.id === updatedGroup.id
      )
      if (index !== -1) {
        this.userGroups.splice(index, 1, updatedGroup)
      }
    },
  },
})
