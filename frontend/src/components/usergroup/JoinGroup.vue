<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-12 sm:space-y-16 px-6">
      <div>
        <h2 class="text-base/7 font-semibold text-gray-900">Join group</h2>
        <p class="mt-1 max-w-2xl text-sm/6 text-gray-600">
          Join a group to collaborate with others on shared projects.
        </p>

        <div
          class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
        >
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              for="username"
              class="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
              >Join code</label
            >
            <div class="mt-2 sm:col-span-2 sm:mt-0 flex gap-4">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  type="text"
                  name="username"
                  id="username"
                  autocomplete="username"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  placeholder="Enter join code"
                  v-model="joinCode"
                />
              </div>

              <button
                type="submit"
                class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserGroupStore } from '@/store/usergroup'

const joinCode = ref('')
const handleSubmit = async () => {
  const userGroupStore = useUserGroupStore()
  await userGroupStore.joinUserGroup(joinCode.value)
}
</script>
