<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">User Groups</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the user groups including their name, description,
          owner, and member count.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="toggleEdit(true)"
        >
          Add Group
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Description
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Owner
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Members
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="group in groups" :key="group.id">
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                >
                  {{ group.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ group.description || 'N/A' }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ group?.owner?.firstName }} {{ group?.owner?.lastName }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ group.members.length }}
                </td>
                <td
                  class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit<span class="sr-only">, {{ group.name }}</span></a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <UserGroupSideover
    v-if="renderEdit"
    :open="visibleEdit"
    :loading="savingInProgress"
    @submit="handleGroupCreate"
    @close="toggleEdit(false)"
  />
</template>

<script setup lang="ts">
import { useUserGroupStore } from '@/store/usergroup'
import { computed, onMounted, ref } from 'vue'
import { useRenderToggleBindings } from '@/composables/useRenderToggle'
import UserGroupSideover from '@/components/sideover/UserGroupSideover.vue'

const savingInProgress = ref(false)
const userGroupStore = useUserGroupStore()
const groups = computed(() => userGroupStore.userGroups)
const [toggleEdit, visibleEdit, renderEdit] =
  useRenderToggleBindings('sideOverEdit')
const handleGroupCreate = async (newGroup) => {
  toggleEdit(false)
  await useUserGroupStore().addUserGroup(newGroup)
}

onMounted(async () => {
  await userGroupStore.fetchUserGroups()
})
</script>
