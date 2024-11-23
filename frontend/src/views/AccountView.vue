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
              <a
                href="#"
                class="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >Edit profile</a
              >
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
            {{ ' ' }}
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
                <PhoneIcon class="h-6 w-5 text-gray-400" aria-hidden="true" />
              </dt>
              <dd class="text-sm/6 text-gray-500">
                <time datetime="2023-01-31">{{ user.phone }}</time>
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
            <!-- <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
              <dt class="flex-none">
                <span class="sr-only">Status</span>
                <CreditCardIcon
                  class="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd class="text-sm/6 text-gray-500">Paid with MasterCard</dd>
            </div> -->
          </dl>
          <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
            <a
              href="#"
              class="items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >Delete Account</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  CalendarDaysIcon,
  CreditCardIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/vue/20/solid'

const stats = [
  { label: 'Notes created', value: 12 },
  { label: 'Groups involved', value: 4 },
  { label: 'Tasks completed', value: 2 },
]

const user = ref({
  name: 'Meno Priezvisko',
  firstName: 'Meno',
  lastName: 'Priezvisko',
  email: 'meno.priezvisko@gmail.com',
  phone: '+421910123123',
  createdAt: '23.11.2024',
  updatedAt: '23.11.2024',
})

// Funkcia na generovanie iniciál
const getUserInitials = (): string => {
  const firstInitial = user.value.firstName.charAt(0).toUpperCase()
  const lastInitial = user.value.lastName.charAt(0).toUpperCase()
  return `${firstInitial}${lastInitial}`
}

// Iniciály používateľa
const userInitials = getUserInitials()
</script>
