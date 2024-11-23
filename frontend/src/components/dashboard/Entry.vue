<template>
  <div
    class="w-full flex items-center justify-between gap-x-6 p-4"
    :class="entry.type == 'note' ? 'bg-secondary' : ''"
  >
    <!-- Entry Details -->
    <div class="min-w-0">
      <div class="flex items-start gap-x-3">
        <p
          class="text-sm font-semibold"
          :class="entry.type == 'note' ? 'text-primary' : 'text-gray-900'"
        >
          {{ entry.name }}
        </p>
        <p
          v-if="entry.type !== 'note'"
          :class="[
            statusColors[entry.status] ||
              'text-gray-600 bg-gray-50 ring-gray-500/10',
            'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
          ]"
        >
          {{ statusLabels[entry.status] || entry.status }}
        </p>
      </div>
      <div class="mt-1 flex flex-col text-xs text-gray-500">
        <!-- Description -->
        <p v-if="entry.description" class="truncate">{{ entry.description }}</p>
        <!-- Deadline -->
        <div class="mt-1 flex items-center gap-x-2">
          <p v-if="entry.deadline" class="whitespace-nowrap">
            Due on <time :datetime="entry.deadline">{{ entry.deadline }}</time>
          </p>
          <svg
            v-if="entry.deadline"
            viewBox="0 0 2 2"
            class="h-1 w-1 fill-current"
          >
            <circle cx="1" cy="1" r="1" />
          </svg>
          <p class="truncate">Created by {{ entry.createdBy || 'Unknown' }}</p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-none items-center gap-x-4">
      <!-- Checkbox for marking as Done -->
      <input
        v-if="entry.type !== 'note'"
        type="checkbox"
        :checked="entry.status === 'DONE'"
        @change="markAsDone"
        class="h-6 w-6 rounded-full border-gray-300 text-primary focus:ring-primary-500"
      />

      <!-- Menu for additional actions -->
      <Menu as="div" class="relative flex-none">
        <MenuButton
          class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
        >
          <span class="sr-only">Open options</span>
          <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
        </MenuButton>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
          >
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-gray-50 outline-none' : '',
                  'block px-3 py-1 text-sm text-gray-900',
                ]"
              >
                Edit<span class="sr-only">, {{ entry.name }}</span>
              </a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-gray-50 outline-none' : '',
                  'block px-3 py-1 text-sm text-gray-900',
                ]"
              >
                Delete<span class="sr-only">, {{ entry.name }}</span>
              </a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

// Props
const props = defineProps({
  entry: {
    type: Object as PropType<any>,
    required: true,
  },
  onStatusChange: {
    type: Function as PropType<(newStatus: string) => void>,
    required: false,
  },
})

// Status mapping
const statuses = {
  TODO: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  IN_PROGRESS: 'text-blue-700 bg-blue-50 ring-blue-600/20',
  DONE: 'text-green-700 bg-green-50 ring-green-600/20',
}

const statusColors = {
  Done: 'text-green-700 bg-green-50 ring-green-600/20',
  'In Progress': 'text-blue-600 bg-blue-50 ring-blue-500/10',
  TODO: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}

const statusLabels = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

// Method for marking as Done
const markAsDone = () => {
  props.onStatusChange?.('DONE')
}
</script>
