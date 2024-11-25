<template>
  <div class="flex min-h-full">
    <!-- Statický základný template -->
    <div
      class="flex flex-1 w-full flex-col mt-10 pb-12 px-4 sm:px-6 lg:flex-none lg:px-12 xl:px-12"
    >
      <div>
        <!-- Pre malé obrazovky -->
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            v-model="activeTab"
          >
            <option v-for="tab in tabs" :key="tab.name" :value="tab.name">
              {{ tab.name }}
            </option>
          </select>
        </div>

        <!-- Pre veľké obrazovky -->
        <div class="hidden sm:block">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex" aria-label="Tabs">
              <button
                v-for="tab in tabs"
                :key="tab.name"
                @click="setActiveTab(tab.name)"
                :class="[
                  activeTab === tab.name
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/2 border-b-2 px-1 py-4 text-center text-sm font-medium',
                ]"
                :aria-current="activeTab === tab.name ? 'page' : undefined"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Obsah aktuálnej tabuľky -->
        <div class="mt-4">
          <div v-if="activeTab === 'Tasks'">
            <div>
              <div class="w-full flex justify-between mb-5">
                <div class="mb-4 text-lg font-bold text-primary">TASKS</div>
                <div class="flex">
                  <button
                    type="button"
                    class="items-center rounded-full bg-primary p-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    @click="toggleEdit(true)"
                  >
                    <PlusIcon class="w-8 h-8" aria-hidden="true"></PlusIcon>
                  </button>
                </div>
              </div>

              <!-- Posúvateľná tabuľka -->
              <div
                class="overflow-y-auto max-h-[calc(100vh-12rem)] bg-white shadow sm:rounded-lg"
              >
                <ul role="list" class="divide-y divide-gray-100">
                  <li
                    v-for="project in filteredTasks"
                    :key="project.id"
                    class="flex items-center justify-between gap-x-6"
                  >
                    <Entry :entry="project" @requestReload="fetchEntries"></Entry>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'Notes'">
            <div class="w-full">
              <div class="w-full flex justify-between mb-5">
                <div class="mb-4 text-lg font-bold text-primary">NOTES</div>
                <div class="flex">
                  <button
                    type="button"
                    class="items-center rounded-full bg-primary p-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    @click="toggleEdit(true)"
                  >
                    <PlusIcon class="w-8 h-8" aria-hidden="true"></PlusIcon>
                  </button>
                </div>
              </div>

              <!-- Posúvateľná tabuľka -->
              <div
                class="overflow-y-auto max-h-[calc(100vh-13rem)] bg-white shadow sm:rounded-lg"
              >
                <ul role="list" class="divide-y divide-gray-100">
                  <li
                    v-for="project in filteredNotes"
                    :key="project.id"
                    class="flex items-center justify-between gap-x-6"
                  >
                    <Entry :entry="project" @requestReload="fetchEntries"></Entry>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EntrySidover
      v-if="renderEdit"
      :open="visibleEdit"
      @close="toggleEdit(false)"
      @submit="fetchEntries"
    ></EntrySidover>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { TaskWidgetType } from '@/types/task'
import TasksListWidget from '@/components/TasksListWidget.vue'
import CalendarWidget from '@/components/CalendarWidget.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/vue/20/solid'
import Entry from '@/components/dashboard/Entry.vue'
import { useRenderToggleBindings } from '@/composables/useRenderToggle'
import EntrySidover from '@/components/dashboard/EntrySideover.vue'
import { useApiFetch } from '@/composables/useApi'

const tabs = [{ name: 'Tasks' }, { name: 'Notes' }]
const activeTab = ref('Tasks')

const setActiveTab = (tabName: string) => {
  activeTab.value = tabName
}

const entries = ref([])

const filteredTasks = computed(() =>
  entries.value.filter((entry) => entry.type === 'task')
)
const filteredNotes = computed(() =>
  entries.value.filter((entry) => entry.type === 'note')
)

const [toggleEdit, visibleEdit, renderEdit] =
  useRenderToggleBindings('sideOver')

const fetchEntries = async () => {
  console.log('aaa');
  
  try {
    const { response, data } = await useApiFetch('entry').get().json()
    if (response.value?.ok && data.value) {
      entries.value = data.value
      console.log('Entries fetched successfully:', data.value)
    } else {
      console.error('Failed to fetch entries:', response.value?.statusText)
    }
  } catch (error) {
    console.error('Error fetching entries:', error)
  }
}

onMounted(async () => {
  await fetchEntries()
})
</script>
