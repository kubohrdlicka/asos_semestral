<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="handleClose">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                >
                  <!-- Header -->
                  <div
                    class="flex items-center justify-between px-4 py-6 sm:px-6"
                  >
                    <DialogTitle class="text-lg font-semibold text-gray-900">
                      Create Entry
                    </DialogTitle>
                    <button
                      type="button"
                      class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      @click="handleClose"
                    >
                      <span class="sr-only">Close panel</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <!-- Form Content -->
                  <form
                    @submit.prevent="handleSubmit"
                    class="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
                  >
                    <div class="space-y-4">
                      <!-- Type -->
                      <div>
                        <label
                          for="type"
                          class="block text-sm font-medium text-gray-700"
                          >Type</label
                        >
                        <select
                          id="type"
                          v-model="entry.type"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option value="note">Note</option>
                          <option value="task">Task</option>
                        </select>
                      </div>

                      <!-- Name -->
                      <div>
                        <label
                          for="name"
                          class="block text-sm font-medium text-gray-700"
                          >Name</label
                        >
                        <input
                          type="text"
                          id="name"
                          v-model="entry.name"
                          required
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>

                      <!-- Tag -->
                      <div>
                        <label
                          for="tag"
                          class="block text-sm font-medium text-gray-700"
                          >Tag</label
                        >
                        <select
                          id="tag"
                          v-model="entry.tag"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option value="" disabled selected>
                            Select a tag
                          </option>
                          <option v-for="tag in tags" :key="tag" :value="tag">
                            {{ tag }}
                          </option>
                        </select>
                      </div>

                      <!-- Priority -->
                      <div v-if="entry.type == 'task'">
                        <label
                          for="priority"
                          class="block text-sm font-medium text-gray-700"
                          >Priority</label
                        >
                        <select
                          id="priority"
                          v-model="entry.priority"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option
                            v-for="(label, key) in priorityOptions"
                            :key="key"
                            :value="key"
                          >
                            {{ label }}
                          </option>
                        </select>
                      </div>

                      <!-- Description -->
                      <div>
                        <label
                          for="description"
                          class="block text-sm font-medium text-gray-700"
                          >Description</label
                        >
                        <textarea
                          id="description"
                          v-model="entry.description"
                          rows="4"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        ></textarea>
                      </div>

                      <!-- Deadline -->
                      <div v-if="entry.type == 'task'">
                        <label
                          for="deadline"
                          class="block text-sm font-medium text-gray-700"
                          >Deadline</label
                        >
                        <input
                          type="datetime-local"
                          id="deadline"
                          v-model="entry.deadline"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>

                      <!-- Status -->
                      <div v-if="entry.type == 'task'">
                        <label
                          for="status"
                          class="block text-sm font-medium text-gray-700"
                          >Status</label
                        >
                        <select
                          id="status"
                          v-model="entry.status"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option
                            v-for="(label, key) in statusOptions"
                            :key="key"
                            :value="label"
                          >
                            {{ label }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <!-- Actions -->
                    <div class="mt-6 flex justify-end">
                      <button
                        type="button"
                        class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                        @click="handleClose"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="ml-4 inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                        :disabled="loading"
                      >
                        <LoadingIcon
                          v-if="loading"
                          class="-ml-1 mr-3 h-5 w-5 text-white"
                        />
                        {{ props.editSrc === null ? 'Save' : 'Update' }}
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import LoadingIcon from '@/components/LoadingIcon.vue'
import { useApiFetch } from '@/composables/useApi'

// Key-Value objects for priority and status
const priorityOptions = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

const statusOptions = {
  TODO: 'TODO',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

// Props
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  editSrc: {
    type: null as any,
    required: true,
  },
  tags: {
    type: Array as () => string[],
    default: () => [],
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

// Emits
const emit = defineEmits<{
  (e: 'submit', entry: any): void
  (e: 'close'): void
}>()

// Reactive state
const entry = ref( props.editSrc !== null ? props.editSrc : {
  type: 'note',
  name: '',
  tag: '',
  priority: '',
  description: '',
  deadline: null as Date | null,
  status: '',
  color: '',
  iconName: '',
  tagId: 0,
})

// Methods
const handleClose = () => {
  emit('close')
}

const handleSubmit = async () => {
  props.loading = true

  try {
    if (entry.value.deadline && !(entry.value.deadline instanceof Date)) {
      entry.value.deadline = new Date(entry.value.deadline)
    }

    const payload: Record<string, any> = {
      type: entry.value.type,
      name: entry.value.name,
      description: entry.value.description,
      deadline: entry.value.deadline,
      color: entry.value.color,
      iconName: entry.value.iconName,
      tagId: entry.value.tagId,
    }

    if (entry.value.priority) {
      payload.priority = entry.value.priority
    }

    if (entry.value.status) {
      payload.status = entry.value.status
    }
    
    const { response, data } = (props.editSrc === null)
      ? await useApiFetch('entry').post(payload).json()
      : await useApiFetch(`entry/${props.editSrc.id}`).patch(payload).json()

    if (response.value?.ok) {
      console.log('Entry created successfully:', data.value)
      emit('submit', entry.value)
      handleClose()
    } else {
      console.error('Failed to create entry:', response.value?.statusText)
    }
  } catch (error) {
    console.error('Error creating entry:', error)
  } finally {
    props.loading = false
  }
}
</script>
