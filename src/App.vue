<template>
  <header class="bg-white shadow h-16 flex justify-between items-stretch">
    <router-link :to="{ name: 'home' }"
      class="inline-flex items-center h-full px-5 text-orange-500 hover:text-orange-600 font-bold text-4xl">
      RecycleGarments
    </router-link>
    <div class="flex items-center gap-1">
      <router-link v-if="token" :to="{ name: 'orders' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white">
        Orders
      </router-link>
      <router-link :to="{ name: 'signup' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white">
        SignUp
      </router-link>
      <router-link v-if="token" :to="{ name: 'account' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white">
        Account
      </router-link>
    </div>
  </header>
  <main>
    <router-view />
  </main>

</template>

<script>
export default {
  data() {
    return {
      token: null
    }
  
  },
  mounted() {
    this.token = localStorage.getItem("token")
  }
}

</script>

<style scoped>

</style>
