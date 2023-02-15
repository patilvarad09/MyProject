<template>
    <div class="max-w-[800px] mx-auto p-8" v-for="ord in orderItem" :key="ord._id">

        <h1 class="text-5xl font-bold mb-5">{{ ord.name }}</h1>

        <div class="grid grid-col-1 sm:grid-cols-2 bg-white transition-all">
            <div class="rounded-xl px-7 py-3">
                <img :src="ord.image" alt="" class="rounded-xl shadow object-cover">
            </div>
            <div class="p-3 rounded-xl shadow object-cover">
                <div v-for="product in products" :key="product._id">
                    <div class="p-3">
                        <p><label class="font-bold">Order ID </label> : {{ product._id }}</p>
                        <p><label class="font-bold">Price </label> : {{ ord.price }}</p>
                        <p><label class="font-bold">Tax </label> : {{ product.tax }}</p>
                        <p><label class="font-bold">Shipping Charges</label> : 30 </p>
                        <p><label class="font-bold">Subtotal </label> : {{ product.subtotal }}</p>
                        <p><label class="font-bold">Total </label> : {{ product.total }}</p>
                        <p><label class="font-bold">Current Status </label> : {{ product.status }}</p>
                        <p><label class="font-bold">Ordered On </label> : {{ product.createdAt }}</p>
                        <button type="button" @click="cancelorder"
                            class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-12 border border-orange-700 rounded-xl mt-16 ml-14">
                            Cancel Order
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import axiosClient from '../axiosClient';
import swal from 'sweetalert';

export default {
    data() {
        return {
            token: null,
            products: [],
            orderItem: []
        }
    },
    methods: {
        async fetchOrders() {
            await axiosClient.get(`orders/${this.$route.params.id}`, {
                headers: { Authorization: `Bearer ${this.token}` }
            })
                .then((data) => {
                    const result = data.data
                    this.products = result;
                    this.orderItem = result.order.orderItems
                })
                .catch((err) => {
                    console.log("err", err);
                });
        },
        async cancelorder(e) {
            e.preventDefault();
            await axiosClient.patch(`orders/${this.$route.params.id}`)
                .then((data) => {
                    const result = data.data
                    this.products = result;
                    this.orderItem = result.order.orderItems
                    swal({
                        text: "Order Canceled Successfully!",
                        icon: "success"
                    });
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