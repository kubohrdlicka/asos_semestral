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
                      Create New Tag
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
                      <div>
                        <label
                          for="name"
                          class="block text-sm font-medium text-gray-700"
                          >Tag Name</label
                        >
                        <input
                          type="text"
                          id="name"
                          v-model="group.name"
                          required
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          for="description"
                          class="block text-sm font-medium text-gray-700"
                          >Description</label
                        >
                        <textarea
                          id="description"
                          v-model="group.description"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          rows="3"
                        ></textarea>
                      </div>

                      <div>
                        <label
                          for="color"
                          class="block text-sm font-medium text-gray-700"
                          >Color (Hex)</label
                        >
                        <input
                          type="text"
                          id="color"
                          v-model="group.color"
                          required
                          placeholder="#3498DB"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          for="icon-name"
                          class="block text-sm font-medium text-gray-700"
                          >Icon Name</label
                        >
                        <input
                          type="text"
                          id="icon-name"
                          v-model="group.iconName"
                          placeholder="group-icon"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>

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
                        Save
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
import { ref, reactive, defineEmits, type PropType } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import LoadingIcon from '@/components/LoadingIcon.vue'

// Props
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

// Emits
const emit = defineEmits<{
  (
    e: 'submit',
    group: {
      name: string
      description?: string
      color: string
      iconName?: string
    }
  ): void
  (e: 'close'): void
}>()

const group = reactive({
  name: '',
  description: '',
  color: '',
  iconName: '',
})

// Methods
const handleClose = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...group })
}
</script>
