<template>
  <div>
    <div>
      
      <!-- Obsah aktuálnej tabuľky -->
      <div class="mt-4">
        <div>
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
              <div class="sm:flex-auto">
                <h1 class="text-base font-semibold text-gray-900">Tags</h1>
                <p class="mt-2 text-sm text-gray-700">
                  A list of all the user tags.
                </p>
              </div>
              <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  @click="toggleEdit(true)"
                >
                  Add Tag
                </button>
              </div>
            </div>
            <div class="mt-8 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                  class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                >
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
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="tag in tags" :key="tag.id">
                        <td
                          class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                        >
                          {{ tag?.name }}
                        </td>
                        <td
                          class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {{ tag?.description || 'N/A' }}
                        </td>
                        <td
                          class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                        >
                          <button
                            href="#"
                            class="text-indigo-600 hover:text-indigo-900"
                            @click="removeTag(tag)"
                          >
                            Remove tag<span class="sr-only"
                              >, {{ tag.name }}</span
                            >
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TagSideover
      v-if="renderEdit"
      :open="visibleEdit"
      :loading="savingInProgress"
      @submit="handleTagCreate"
      @close="toggleEdit(false)"
    />
  </div>
</template>

<script setup lang="ts">
import { useTagStore } from '@/store/tag'
import { computed, onMounted, ref } from 'vue'
import { useRenderToggleBindings } from '@/composables/useRenderToggle'
import TagSideover from '@/components/sideover/TagSideover.vue'

const savingInProgress = ref(false)
const tagStore = useTagStore()
const tags = computed(() => tagStore.tags)
const [toggleEdit, visibleEdit, renderEdit] =
  useRenderToggleBindings('sideOverEdit')

  const handleTagCreate = async (newTag: any) => {
  toggleEdit(false)
  await useTagStore().addTag(newTag)
}

const removeTag = (tag: any) => {
  useTagStore().removeTag(tag.id)
}

onMounted(async () => {
  await tagStore.fetchTags()
})
</script>
