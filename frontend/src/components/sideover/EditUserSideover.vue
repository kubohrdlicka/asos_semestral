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
                      Edit User
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
                          for="first-name"
                          class="block text-sm font-medium text-gray-700"
                          >First Name</label
                        >
                        <input
                          type="text"
                          id="first-name"
                          v-model="user.firstName"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          for="last-name"
                          class="block text-sm font-medium text-gray-700"
                          >Last Name</label
                        >
                        <input
                          type="text"
                          id="last-name"
                          v-model="user.lastName"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          for="email"
                          class="block text-sm font-medium text-gray-700"
                          >Email</label
                        >
                        <input
                          type="email"
                          id="email"
                          v-model="user.email"
                          disabled
                          class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-gray-300 focus:ring-0 sm:text-sm cursor-not-allowed"
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
                        <slot />
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
import { ref, reactive, defineEmits, watch, type PropType } from 'vue'
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
  modelValue: {
    type: Object as PropType<any>,
    required: true,
  },
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
  (e: 'submit', user: any): void
  (e: 'close'): void
}>()

const user = ref({ ...props.modelValue })
const isOpen = ref(props.open)

// Methods
const handleClose = () => {
  emit('close')
}

// Metóda na odoslanie údajov pri stlačení tlačidla Save
const handleSubmit = () => {
  emit('submit', user.value) // Odošle aktualizovaný objekt do rodiča
}
</script>
