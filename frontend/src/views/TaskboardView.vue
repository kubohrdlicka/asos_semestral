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
                class="relative overflow-y-auto max-h-[calc(100vh-12rem)] bg-white shadow sm:rounded-lg"
              >
                <ul role="list" class="divide-y divide-gray-100">
                  <li
                    v-for="project in filteredTasks"
                    :key="project.id"
                    class="flex items-center justify-between gap-x-6"
                  >
                    <Entry :entry="project"></Entry>
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
                class="relative overflow-y-auto max-h-[calc(100vh-12rem)] bg-white shadow sm:rounded-lg"
              >
                <ul role="list" class="divide-y divide-gray-100">
                  <li
                    v-for="project in filteredNotes"
                    :key="project.id"
                    class="flex items-center justify-between gap-x-6"
                  >
                    <Entry :entry="project"></Entry>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TASKY -->

      <!-- Notes -->
    </div>
    <EntrySidover
      v-if="renderEdit"
      :open="visibleEdit"
      @close="toggleEdit(false)"
    ></EntrySidover>
  </div>
</template>

<script setup lang="ts">
import { TaskWidgetType } from '@/types/task'
import TasksListWidget from '@/components/TasksListWidget.vue'
import CalendarWidget from '@/components/CalendarWidget.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import Entry from '@/components/dashboard/Entry.vue'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { useRenderToggleBindings } from '@/composables/useRenderToggle'
import EntrySidover from '@/components/dashboard/EntrySideover.vue'
import { ref, computed } from 'vue'

// Inicializácia tabuľky
const tabs = [{ name: 'Tasks' }, { name: 'Notes' }]

// Aktívna tabuľka
const activeTab = ref('Tasks')

// Metóda na nastavenie aktívnej tabuľky
const setActiveTab = (tabName) => {
  activeTab.value = tabName
}

// NAMOCKOVANE DATA
const entries = [
  {
    id: 1,
    createdBy: 'Lukas Visvarda',
    type: 'task',
    name: 'Dokončiť projekt Vue',
    tag: {
      name: 'Development',
      description: 'Práce na projekte',
      color: 'blue',
      iconName: 'code',
      createdAt: '2023-06-10T00:00Z',
      updatedAt: '2023-06-10T00:00Z',
    },
    priority: 'high',
    description: 'Je potrebné dokončiť projekt Vue pred deadlinom.',
    deadline: '2023-12-15T10:00Z',
    status: 'Done',
    createdAt: '2023-12-01T08:00Z',
    updatedAt: '2023-12-01T08:00Z',
  },
  {
    id: 2,
    createdBy: 'Sophia Carter',
    type: 'note',
    name: 'Schôdzka so zákazníkom',
    tag: {
      name: '',
      description: '',
      color: '',
      iconName: '',
      createdAt: '',
      updatedAt: '',
    },
    priority: '',
    description: 'Poznámky zo schôdzky so zákazníkom.',
    deadline: '',
    status: '',
    createdAt: '2023-12-01T08:00Z',
    updatedAt: '2023-12-01T08:00Z',
  },
  {
    id: 3,
    createdBy: 'Lukas Visvarda',
    type: 'task',
    name: 'Pripraviť školenie pre tím',
    tag: {
      name: 'Training',
      description: '',
      color: 'green',
      iconName: 'school',
      createdAt: '2023-12-01T08:00Z',
      updatedAt: '2023-12-01T08:00Z',
    },
    priority: 'medium',
    description: 'Školenie o nových technológiách.',
    deadline: '2023-12-20T14:00Z',
    status: 'TODO',
    createdAt: '2023-12-01T08:00Z',
    updatedAt: '2023-12-01T08:00Z',
  },
  {
    id: 4,
    createdBy: 'Sophia Carter',
    type: 'note',
    name: 'Poznámky z prezentácie',
    tag: {
      name: 'Meetings',
      description: '',
      color: '',
      iconName: '',
      createdAt: '2023-12-01T08:00Z',
      updatedAt: '2023-12-01T08:00Z',
    },
    priority: '',
    description: '',
    deadline: '',
    status: '',
    createdAt: '2023-12-01T08:00Z',
    updatedAt: '2023-12-01T08:00Z',
  },
  {
    id: 5,
    createdBy: 'Lukas Visvarda',
    type: 'task',
    name: 'Testovanie aplikácie',
    tag: {
      name: 'Testing',
      description: 'Kontrola kvality aplikácie.',
      color: 'red',
      iconName: 'bug',
      createdAt: '2023-12-01T08:00Z',
      updatedAt: '2023-12-01T08:00Z',
    },
    priority: 'high',
    description: 'Otestovať všetky funkcie aplikácie.',
    deadline: '2023-12-18T18:00Z',
    status: 'In Progress',
    createdAt: '2023-12-01T08:00Z',
    updatedAt: '2023-12-01T08:00Z',
  },
  {
    id: 6,
    createdBy: 'Sophia Carter',
    type: 'note',
    name: 'Zoznam úloh na december',
    tag: {
      name: 'Planning',
      description: 'Zoznam dôležitých úloh.',
      color: 'purple',
      iconName: 'list',
      createdAt: '2023-12-01T08:00Z',
      updatedAt: '2023-12-01T08:00Z',
    },
    priority: '',
    description: 'Zoznam dôležitých úloh na mesiac december.',
    deadline: '',
    status: '',
    createdAt: '2023-12-01T08:00Z',
    updatedAt: '2023-12-01T08:00Z',
  },
  {
    id: 7,
    createdBy: 'Lukas Visvarda',
    type: 'task',
    name: 'Opraviť chyby v aplikácii',
    tag: {
      name: 'Bug Fixing',
      description: 'Riešenie bugov.',
      color: 'orange',
      iconName: 'hammer',
      createdAt: '2023-12-01T08:00Z',
      updatedAt: '2023-12-01T08:00Z',
    },
    priority: 'low',
    description: 'Vyčistiť kód a opraviť nájdené chyby.',
    deadline: '2023-12-22T12:00Z',
    status: 'TODO',
    createdAt: '2023-12-01T08:00Z',
    updatedAt: '2023-12-01T08:00Z',
  },
  {
    id: 8,
    createdBy: 'Sophia Carter',
    type: 'note',
    name: 'Poznámky k novému dizajnu',
    tag: {
      name: 'Design',
      description: 'Dizajnové zmeny.',
      color: 'teal',
      iconName: 'paintbrush',
      createdAt: '2023-12-01T08:00Z',
      updatedAt: '2023-12-01T08:00Z',
    },
    priority: '',
    description: 'Nové zmeny v dizajne aplikácie.',
    deadline: '',
    status: '',
    createdAt: '2023-12-01T08:00Z',
    updatedAt: '2023-12-01T08:00Z',
  },
  {
    id: 9,
    createdBy: 'Lukas Visvarda',
    type: 'task',
    name: 'Pripraviť dokumentáciu',
    tag: {
      name: 'Documentation',
      description: 'Písanie technickej dokumentácie.',
      color: 'gray',
      iconName: 'file-text',
      createdAt: '2023-12-01T08:00Z',
      updatedAt: '2023-12-01T08:00Z',
    },
    priority: 'medium',
    description: 'Pripraviť technickú dokumentáciu k aplikácii.',
    deadline: '2023-12-19T16:00Z',
    status: 'TODO',
    createdAt: '2023-12-01T08:00Z',
    updatedAt: '2023-12-01T08:00Z',
  },
  {
    id: 10,
    createdBy: 'Sophia Carter',
    type: 'task',
    name: 'Prezentácia pre klienta',
    tag: {
      name: 'Presentation',
      description: 'Pripraviť prezentáciu.',
      color: 'pink',
      iconName: 'presentation-chart',
      createdAt: '2023-12-01T08:00Z',
      updatedAt: '2023-12-01T08:00Z',
    },
    priority: 'high',
    description: 'Pripraviť prezentáciu o projekte pre klienta.',
    deadline: '2023-12-20T10:00Z',
    status: 'In Progress',
    createdAt: '2023-12-01T08:00Z',
    updatedAt: '2023-12-01T08:00Z',
  },
]

// Reactive state
const entry = ref({
  type: 'note',
  name: '',
  tag: '',
  priority: '',
  description: '',
  deadline: '',
  status: '',
})

const filteredTasks = computed(() =>
  entries.filter((entry) => entry.type === 'task')
)

const filteredNotes = computed(() =>
  entries.filter((entry) => entry.type === 'note')
)

const [toggleEdit, visibleEdit, renderEdit] =
  useRenderToggleBindings('sideOver')
</script>
