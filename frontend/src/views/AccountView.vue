<template>
  <div class="min-h-full">
    <div class="w-full">
      <div class="overflow-hidden rounded-lg">
        <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
        <div class="bg-white p-6">
          <div class="sm:flex sm:items-center sm:justify-between">
            <div class="sm:flex sm:space-x-5">
              <div class="shrink-0">
                <div
                  class="mx-auto w-20 h-20 rounded-full flex items-center justify-center border border-primary text-xl"
                >
                  {{ userInitials }}
                </div>
              </div>
              <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p class="text-sm font-medium text-gray-600">Welcome back,</p>
                <p class="text-xl font-bold text-primary sm:text-2xl">
                  {{ user.firstName + ' ' + user.lastName }}
                </p>
                <p class="text-sm font-medium text-gray-600">
                  OnTrack for 180 days
                </p>
              </div>
            </div>
            <div class="mt-5 flex justify-center sm:mt-0">
              <!-- Edit Profile Button -->
              <button
                type="button"
                class="flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                @click="toggleEdit(true)"
              >
                Edit profile
              </button>
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-1 divide-y divide-gray-300 bg-secondary sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="px-6 py-5 text-center text-sm font-medium"
          >
            <span class="text-primary">{{ stat.value }}</span>
            <span class="text-gray-600">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-1 w-full flex-col mt-10 pb-12 px-4 sm:px-6 lg:flex-none lg:px-12 xl:px-12"
    >
      <div class="lg:col-start-3 lg:row-end-1">
        <h2 class="sr-only">Summary</h2>
        <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
          <dl class="flex flex-wrap">
            <div class="mt-6 flex w-full flex-none gap-x-4 px-6 pt-6">
              <dt class="flex-none">
                <span class="sr-only">Client</span>
                <EnvelopeIcon
                  class="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd class="text-sm/6 font-medium text-gray-900">
                {{ user.email }}
              </dd>
            </div>
            <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
              <dt class="flex-none">
                <CalendarDaysIcon
                  class="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd class="text-sm/6 text-gray-500">
                <time datetime="2023-01-31">{{ user.createdAt }}</time>
              </dd>
            </div>
          </dl>
          <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
            <!-- Change Password Button -->
            <button
              type="button"
              class="items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              @click="toggleChangePassword(true)"
            >
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Sideover -->
    <EditUserSideover
      v-if="renderEdit"
      :modelValue="user"
      :open="visibleEdit"
      :loading="savingInProgress"
      @submit="handleUserUpdate"
      @close="toggleEdit(false)"
    />

    <!-- Change Password Sideover -->
    <ChangePasswordSideover
      v-if="renderChangePassword"
      :open="visibleChangePassword"
      :loading="savingInProgress"
      @submit="handleChangePassword"
      @close="toggleChangePassword(false)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CalendarDaysIcon, EnvelopeIcon } from '@heroicons/vue/20/solid'
import EditUserSideover from '@/components/sideover/EditUserSideover.vue'
import ChangePasswordSideover from '@/components/sideover/ChangePasswordSideover.vue'
import { useRenderToggleBindings } from '@/composables/useRenderToggle'
import { useUserStore } from '@/store/user'
import { useApiFetch } from '@/composables/useApi'

const stats = [
  { label: 'Notes created', value: 12 },
  { label: 'Groups involved', value: 4 },
  { label: 'Tasks completed', value: 2 },
]

const userStore = useUserStore()

const savingInProgress = ref(false)

const [toggleEdit, visibleEdit, renderEdit] =
  useRenderToggleBindings('sideOverEdit')

const [toggleChangePassword, visibleChangePassword, renderChangePassword] =
  useRenderToggleBindings('sideOverChangePassword')

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('sk-SK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

const user = computed(() => ({
  firstName: userStore.getFirstName,
  lastName: userStore.getLastName,
  email: userStore.getEmail,
  createdAt: userStore.createdAt ? formatDate(userStore.createdAt) : 'N/A',
}))

const getUserInitials = (): string => {
  const firstInitial = user.value.firstName.charAt(0).toUpperCase()
  const lastInitial = user.value.lastName.charAt(0).toUpperCase()
  return `${firstInitial}${lastInitial}`
}

const userInitials = getUserInitials()

const handleUserUpdate = async (updatedUser: {
  firstName: string
  lastName: string
}) => {
  savingInProgress.value = true

  try {
    const { response } = await useApiFetch('users')
      .patch({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      })
      .json()

    if (response.value?.ok) {
      userStore.setFirstName(updatedUser.firstName)
      userStore.setLastName(updatedUser.lastName)
      console.log('User successfully updated:', updatedUser)
    } else {
      console.error('Failed to update user:', response.value?.statusText)
    }
  } catch (error) {
    console.error('Error updating user:', error)
  } finally {
    savingInProgress.value = false
    toggleEdit(false)
  }
}

const handleChangePassword = async (passwords: {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}) => {
  savingInProgress.value = true

  console.log(passwords)

  try {
    const { response } = await useApiFetch('auth/reset-password')
      .patch(passwords)
      .json()

    if (response.value?.ok) {
      console.log('Password changed successfully!')
      toggleChangePassword(false)
    } else {
      console.error('Failed to change password:', response.value?.statusText)
    }
  } catch (err) {
    console.error('Error changing password:', err)
  } finally {
    savingInProgress.value = false
  }
}

onMounted(async () => {
  if (!userStore.isAuth) {
    await userStore.init()
  }
})
</script>
