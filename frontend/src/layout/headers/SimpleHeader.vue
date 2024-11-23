<template>
  <header
    class="bg-white bg-gradient-to-r from-primary-50 to-primary-100 border-b border-gray-300"
  >
    <nav
      class="flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1 text-2xl font-bold text-primary font-sans">
        ONTRACK
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.route"
          class="font-medium text-gray-500 hover:text-gray-900"
          >{{ item.name }}</router-link
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <!-- <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
          >Log in <span aria-hidden="true">&rarr;</span></a
        > -->
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
        <p class="font-normal">{{ firstName }} {{ lastName }}</p>
        <a
          @click="logout"
          class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
        >
          Log out <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../../store/user'
import router from '../../router'
const userStore = useUserStore()
const firstName = userStore.first_name
const lastName = userStore.last_name

const navigation = [
  { name: 'Dashboard', route: 'dashboard' },
  { name: 'Groups', route: 'groups' },
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
