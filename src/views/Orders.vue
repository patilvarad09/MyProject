<template>
    <div class="container">
        <div class="row">
            <div>
                <h4 class="pt-3 font-bold text-center text-3xl text-orange-500">Your Orders</h4>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 p-8">
        <div v-for="product of products" :key="product._id" class="bg-white shadow rounded-2xl">
            <p class="ml-3 mt-2 items-center ">
            <p class="font-bold">Order ID:</p> {{ product._id }}</p>
            <div class="p-3">
                <div class="flex items-center justify-between">
                    <p class="mb-4">
                    <p class="font-bold">Total Price:</p> {{ product.total }}</p>
                    <p class="mb-4">
                    <p class="font-bold">Status:</p> {{ product.status }}</p>
                    <p class="mb-4">
                    <p class="font-bold">Ordered On</p> {{ product.createdAt }}</p>
                    <router-link :to="{ name: 'orderdetails', params: { id: product._id } }"
                        class="text-center px-3 py-3 text-white rounded-xl border-2 border-orange-600 bg-orange-500 hover:bg-orange-600 transition-colors">More
                        Details</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axiosClient from '../axiosClient';

export default {
    data() {
        return {
            token: null,
            products: [],
        }
    },
    methods: {
        async fetchOrders() {
            await axiosClient.get('orders/showAllMyOrders', {
                headers: { Authorization: `Bearer ${this.token}` }
            })
                .then((data) => {
                    const result = data.data
                    this.products = result.orders;
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");
        if (this.token) {
            this.fetchOrders();
        } 

    }
}
</script>