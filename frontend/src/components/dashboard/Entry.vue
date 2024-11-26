<template>
  <div
    class="w-full flex items-center justify-between gap-x-6 p-4"
    :class="entry.type == 'note' ? 'bg-secondary' : ''"
  >
    <!-- Entry Details -->
    <div class="min-w-0">
      <div class="flex items-center gap-x-3">
        <p
          class="text-sm font-semibold"
          :class="entry.type == 'note' ? 'text-primary' : 'text-gray-900'"
        >
          {{ entry.name }}
        </p>
        <p
          v-if="(entry.type === 'task') && (!!entry.status)"
          :class="[
            statusColors[entry.status] ||
              'text-gray-600 bg-gray-50 ring-gray-500/10',
            'whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
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
          <p class="truncate">Created by {{ entry.owner !== null ? `${entry.owner.firstName} ${entry.owner.lastName}` : 'Unknown' }}</p>
          <svg
            v-if="entry.userGroup"
            viewBox="0 0 2 2"
            class="h-1 w-1 fill-current"
          >
            <circle cx="1" cy="1" r="1" />
          </svg>
          <div v-if="entry.userGroup" class="flex items-center border border-gray-300 rounded-md px-[3px] py-[1px]">
            <UsersIcon class="text-gray-600 w-[12px] h-[12px] me-0.5"/>
            <p>{{ entry.userGroup.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-none items-center gap-x-4">
      <!-- Menu for additional actions -->
      <Menu as="div" class="flex-none">
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
            class="absolute right-0 z-10 mt-2 w-40 me-6 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
          >
            <MenuItem v-slot="{ active }">
              <div class="flex items-center">
                <PencilIcon class="w-[15px] h-[15px] text-gray-400 ms-3 mb-[2px]"/>
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-50 outline-none' : '',
                    'block px-3 ps-2 py-2 text-sm text-gray-900',
                  ]"
                >
                  Edit<span class="sr-only">, {{ entry.name }}</span>
                </a>
              </div>
            </MenuItem>
            <MenuItem v-if="entry.type !== 'note'" v-slot="{ active }">
              <div class="flex items-center">
                <TagIcon class="w-[15px] h-[15px] text-gray-400 ms-3 mb-[2px]"/>
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-50 outline-none' : '',
                    'block px-3 ps-2 py-2 text-sm text-gray-900',
                  ]"
                  @click.prevent="toggleStatusModal(true)"
                >
                  Change status<span class="sr-only">, {{ entry.name }}</span>
                </a>
              </div>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <div class="flex items-center">
                <UserIcon class="w-[15px] h-[15px] text-gray-400 ms-3 mb-[2px]"/>
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-50 outline-none' : '',
                    'block px-3 ps-2 py-2 text-sm text-gray-900',
                  ]"
                  @click.prevent="toggleGroupModal(true)"
                >
                  Change group<span class="sr-only">, {{ entry.name }}</span>
                </a>
              </div>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <div class="flex items-center">
                <TrashIcon class="w-[15px] h-[15px] text-gray-400 ms-3 mb-[2px]"/>
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-50 outline-none' : '',
                    'block px-3 px-2 py-2 text-sm text-gray-900',
                  ]"
                  @click.prevent="handleDelete"
                >
                  Delete<span class="sr-only">, {{ entry.name }}</span>
                </a>
              </div>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <!-- Modal na zmenu statusu -->
    <StatusModal
      v-if="renderStatusModal"
      :open="visibleStatusModal"
      @statusChange="handleStatusChange"
      @close="toggleStatusModal(false)"
    />
    <GroupModal
      v-if="renderGroupModal"
      :open="visibleGroupModal"
      :entry="props.entry"
      @groupUpdated="handleGroupChange"
      @close="toggleGroupModal(false)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, PropType } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { PencilIcon, TrashIcon, TagIcon, UserIcon, UsersIcon } from '@heroicons/vue/24/outline'
import StatusModal from '@/components/dashboard/StatusModal.vue'
import GroupModal from '@/components/dashboard/GroupModal.vue'
import { useRenderToggleBindings } from '@/composables/useRenderToggle'
import { useApiFetch } from '@/composables/useApi'

// Props
const props = defineProps({
  entry: {
    type: Object as PropType<any>,
    required: true,
  },
  onDelete: {
    type: Function as PropType<(id: number) => void>,
    required: false,
  },
  onStatusChange: {
    type: Function as PropType<(newStatus: string) => void>,
    required: false,
  },
})

const emit = defineEmits(['requestReload'])

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

// Handle Status Change
const handleStatusChange = async (newStatus: string) => {
  try {
    const { response, data } = await useApiFetch(`entry/${props.entry.id}`)
      .patch({
        ...props.entry,
        owner: undefined,
        tag: undefined,
        userGroup: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        id: undefined,
        status: newStatus,
      })
      .json()

    if (response.value?.ok) {
      console.log('Entry status updated successfully:', data.value)
      props.onStatusChange?.(newStatus)
      emit('requestReload')
    } else {
      console.error(
        'Failed to update entry status:',
        response.value?.statusText
      )
    }
  } catch (error) {
    console.error('Error updating entry status:', error)
  }
}

const handleGroupChange = () => {
  emit('requestReload')
}

// Handle Delete
const handleDelete = async () => {
  try {
    const { response } = await useApiFetch(`entry/${props.entry.id}`).delete()

    if (response.value?.ok) {
      console.log('Entry deleted successfully')
      props.onDelete?.(props.entry.id)
      emit('requestReload')
    } else {
      console.error('Failed to delete entry:', response.value?.statusText)
    }
  } catch (error) {
    console.error('Error deleting entry:', error)
  }
}

// Status Modal Controls
const [toggleStatusModal, visibleStatusModal, renderStatusModal] =
  useRenderToggleBindings('statusModal')

const [toggleGroupModal, visibleGroupModal, renderGroupModal] =
  useRenderToggleBindings('groupModal')

</script>
