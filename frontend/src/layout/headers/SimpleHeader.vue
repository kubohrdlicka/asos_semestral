<template>
  <header class="bg-primary-600 bg-gradient-to-r from-primary-500 to-primary-700 border-b border-gray-300">
    <nav
      class="flex items-center justify-between px-6 py-3 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1 text-2xl font-bold text-white">Tasks & Stuff</div>
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.route"
          class="font-medium text-white hover:text-primary-200"
          >{{ item.name }}</router-link
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <router-link to="account">
          <div class="border border-white rounded-full p-1 text-white ease-in-out hover:text-primary-200 hover:border-primary-200">
            <UserIcon class="w-[26px] h-[26px]"/>
          </div>
        </router-link>
        <!--
          <a @click="logout" class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
            Log out <span aria-hidden="true">&rarr;</span>
          </a>
        -->
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../../store/user'
import router from '../../router'
import { UserIcon } from '@heroicons/vue/24/solid';
const userStore = useUserStore()

const navigation = [
  { name: 'Dashboard', route: 'tasks' },
  { name: 'Profile', route: 'profile' },
]

const logout = () => {
  useUserStore().logout()
  router.push({ name: 'login' })
}

const mobileMenuOpen = ref(false)
</script>
<style>
.el-button,
.el-button:hover,
.el-button:focus {
  color: white !important;
  background-color: #ff000000 !important;
  border-color: white !important;
  padding: 16px !important;
}
</style>
