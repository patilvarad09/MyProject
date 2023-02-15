<template>
    <div class="max-w-[800px] mx-auto p-8">
        <h1 class="text-5xl font-bold mb-5">{{ product.name }}</h1>
    </div>
    <div class="grid grid-col-1 sm:grid-cols-2 bg-white transition-all">
        <div class="rounded-xl px-7 py-3">
            <img :src="product.image" alt="" class="rounded-xl shadow object-cover">
        </div>
        <div class="p-3 rounded-xl shadow object-cover">
            <div class="p-3">
                <h1 class="text-2xl"><strong class="font-bold">Brand Name: </strong>{{ product.brand }}</h1>
            </div>
            <div class="p-3">
                <h1 class="text-2xl"><strong class="font-bold">Category: </strong>{{ product.category }}</h1>
            </div>
            <div class="p-3">
                <h1 class="text-2xl"><strong class="font-bold">Description: </strong>{{ product.description }}</h1>
            </div>
            <div class="p-3">
                <h1 class="text-2xl"><strong class="font-bold">Price: </strong>{{ product.price }}</h1>
            </div>
            <div class="p-3">
                <h1 class="font-bold text-2xl">Available:</h1>
                <h1 class="text-2xl font-semi-bold"> {{ product.countInStock }} Items are available in stocks</h1>
            </div>
            <div class="py-20 text-center">
                <router-link :to="{ name: 'buynow' }"
                    class="text-center text-3xl shadow px-8 py-3 text-white rounded border-2 border-orange-600 bg-orange-500 hover:bg-orange-600 transition-all">Buy
                    Now
                </router-link>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosClient from '../axiosClient';


const route = useRoute();
const product = ref({})

onMounted(() => {
    axiosClient.get(`products/${route.params.id}`)
        .then(({ data }) => {
            product.value = data || {}
        });
})
</script>