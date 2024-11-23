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
    addUserGroup(userGroup: UserGroupDto) {
      this.userGroups.push(userGroup)
    },
    removeUserGroup(groupId: string) {
      this.userGroups = this.userGroups.filter((group) => group.id !== groupId)
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
