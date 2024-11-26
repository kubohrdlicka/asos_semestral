<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeModal">
      <!-- Background Overlay -->
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <!-- Modal Panel -->
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                <div class="mt-3 text-center sm:mt-3">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold text-gray-900"
                  >
                    Group assignment
                  </DialogTitle>
                </div>
              </div>
              <div class="mt-3 sm:mt-3 space-y-3">
                <div class="w-full max-w-xs mx-auto">
                  <label for="fancy-select" class="text-sm text-gray-500">
                    Assign to group
                  </label>
                  <div class="relative mt-2">
                    <select
                      id="fancy-select"
                      name="fancy-select"
                      class="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      v-model="newAssignment"
                    >
                      <option :value="null" disabled selected>Select a group</option>
                      <option v-for="(item, i) in userGroupStore.getAllUserGroups" :key="i" :value="item.id">
                        {{ item.name }}
                      </option>
                    </select>
                    <div class="flex justify-between mt-4">
                      <button 
                        :disabled="!newAssignment" @click="handleGroupRemove"
                        class="w-full md:w-1/3 flex w-full justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                        Remove
                      </button>
                      <button 
                        :disabled="!newAssignment" @click="handleGroupAdd"
                        class="w-full md:w-1/3 flex w-full justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, defineEmits, PropType } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { useUserGroupStore } from '@/store/usergroup'
import { useApiFetch } from '@/composables/useApi'

// Props
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  entry: {
    type: Object as PropType<any>,
    required: true,
  },
  onGroupChange: {
    type: Function as PropType<() => void>,
    required: false,
  },
})

const userGroupStore = useUserGroupStore()
const newAssignment = ref(props.entry.userGroup !== null ? props.entry.userGroup?.id : null)

// Emits
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'groupUpdated'): void
}>()

// Methods
const closeModal = () => {
  emit('close')
}

const handleGroupAdd = async () => {
  try {
    const { response, data } = await useApiFetch(`usergroup/${newAssignment.value}/entry/${props.entry.id}`)
      .post()
      .json()

    if (response.value?.ok) {
      console.log('Entry group updated successfully:', data.value)
      emit('groupUpdated')
      emit('close')
    } else {
      console.error(
        'Failed to update entry group:',
        response.value?.statusText
      )
    }
  } catch (error) {
    console.error('Error updating entry group:', error)
  }
}
const handleGroupRemove = async () => {
  try {
    const { response, data } = await useApiFetch(`usergroup/${newAssignment.value}/entry/${props.entry.id}`)
      .delete()
      .json()

    if (response.value?.ok) {
      console.log('Entry group updated successfully:', data.value)
      emit('groupUpdated')
      emit('close')
    } else {
      console.error(
        'Failed to update entry group:',
        response.value?.statusText
      )
    }
  } catch (error) {
    console.error('Error updating entry group:', error)
  }
}

</script>
