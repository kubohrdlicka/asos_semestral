<template>
  <div class="flex min-h-full">
    <!-- Statický základný template -->
    <div
      class="flex flex-1 w-full flex-col mt-10 pb-12 px-4 sm:px-6 lg:flex-none lg:px-12 xl:px-12"
    >
      <!-- Hlavná sekcia -->
      <div class="mb-4 text-lg font-bold">Dashboard</div>

      <!-- Posúvateľná tabuľka -->
      <div
        class="relative overflow-y-auto max-h-[calc(100vh-12rem)] bg-white shadow sm:rounded-lg"
      >
        <ul role="list" class="divide-y divide-gray-100">
          <li
            v-for="project in projects"
            :key="project.id"
            class="flex items-center justify-between gap-x-6 py-5 px-6"
          >
            <Entry :entry="project"></Entry>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskWidgetType } from '@/types/task'
import TasksListWidget from '@/components/TasksListWidget.vue'
import CalendarWidget from '@/components/CalendarWidget.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import Entry from '@/components/dashboard/Entry.vue'

const statuses = {
  Complete: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
const projects = [
  {
    id: 1,
    name: 'GraphQL API',
    href: '#',
    status: 'Complete',
    createdBy: 'Leslie Alexander',
    deadline: '2023-03-17T00:00Z',
  },
  {
    id: 2,
    name: 'New benefits plan',
    href: '#',
    status: 'In progress',
    createdBy: 'Leslie Alexander',
    deadline: '2023-05-05T00:00Z',
  },
  {
    id: 3,
    name: 'Onboarding emails',
    href: '#',
    status: 'In progress',
    createdBy: 'Courtney Henry',
    deadline: '2023-05-25T00:00Z',
  },
  {
    id: 4,
    name: 'iOS app',
    href: '#',
    status: 'In progress',
    createdBy: 'Leonard Krasner',
    deadline: '2023-06-07T00:00Z',
  },
  {
    id: 5,
    name: 'Marketing site redesign',
    href: '#',
    status: 'Archived',
    createdBy: 'Courtney Henry',
    deadline: '2023-06-10T00:00Z',
  },
]
</script>
