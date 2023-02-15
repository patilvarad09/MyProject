<template>
  <div class="flex flex-col p-8">
    <input type="text" v-model="keyword" class="rounded border-2 border-gray-200 hover:border-orange-500 w-full"
      placeholder="Search for products" @change="loadproducts" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-8">
    <div v-for="product of products" :key="product._id" class="bg-white shadow rounded-xl">
      <img :src="product.image" alt="" class="rounded-t-xl w-full h-48 object-cover">
      <div class="p-3">
        <router-link :to="{ name: 'productdetails', params: { id: product._id } }">
          <h3 class="font-bold">{{ product.name }}</h3>
        </router-link>
        <div class="flex items-center justify-between">
          <p class="mb-4">Price: {{ product.price }}</p>
          <router-link :to="{ name: 'buynow', params: { id: product._id } }"
            class="text-center px-3 py-3 text-white rounded-xl border-2 border-orange-600 bg-orange-500 hover:bg-orange-600 transition-colors">Buy
            Now</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';
import store from '../store/index.js'
const route = useRoute();
const keyword = ref('');

const products = computed(() => store.state.products);
function loadproducts() {
  store.dispatch("loadproducts", keyword.value)

}
onMounted(() => {
  loadproducts()
  keyword.value = route.params.name;
  if (keyword.value) {
    loadproducts()
  }
})
</script>