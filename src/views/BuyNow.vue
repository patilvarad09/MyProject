<template>

    <div class="max-w-[800px] mx-auto p-8 ">
        <h3 class="text-3xl font-bold mb-5">{{ product.name }}</h3>
    </div>
    <div class="grid grid-col-1 sm:grid-cols-2 bg-white transition-all">
        <div class="rounded-xl px-7 py-3">
            <img :src="product.image" alt="" class="rounded-xl shadow object-cover">
        </div>

        <div class="p-3 rounded-xl shadow object-cover">
            <form>
                <div class="p-3 form-group">
                    <p class="font-bold text-left">Enter Delivery Address</p>
                    <textarea type="text" v-model="shippingAddress"
                        class="form-control bg-white shadow rounded-xl hover:scale-105 transition-all"
                        placeholder="Address to deliver"></textarea>
                </div>
                <label class="block text-left p-3" style="max-width: 240px">
                    <span class="font-bold">Payment</span>
                    <select
                        class="form-multiselect  w-full mt-1 form-control bg-white shadow rounded hover:scale-105 transition-all"
                        multiple>
                        <option>Prepaid UPI</option>
                        <option>Prepaid Card</option>
                        <option>Cash On Delivery</option>
                    </select>
                </label>
                <div class="p-3">
                    <p><label class="font-bold">Price </label> : {{ product.price }}</p>
                    <p><label class="font-bold">Tax </label> : {{ product.price * 18 / 100 }}</p>
                    <p><label class="font-bold">Shipping Charges</label> : 30 </p>
                    <p><label class="font-bold">Total </label> : {{ (product.price * 18 / 100) + 30 + product.price }}
                    </p>
                </div>
                <p></p>
                <div class="text-center p-4 form-group">
                    <button type="button" @click="placeorder"
                        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-12 border border-orange-700 rounded-xl">
                        Place Order
                    </button>
                </div>
            </form>
        </div>

    </div>

</template>

<script>
import axiosClient from '../axiosClient';
import sweetalert from 'sweetalert';
export default {
    data() {
        return {
            product: [],
            shippingAddress: null,
            token: null
        }
    },
    methods: {
        async loadproduct() {
            await axiosClient.get(`products/${this.$route.params.id}`)
                .then(({ data }) => {
                    this.product = data
                });
        },
        async placeorder() {
            const newOrder = {
                tax: this.product.price * 18 / 100,
                shippingFee: 30,
                shippingAddress: this.shippingAddress,
                amount: 1,
                items: [{
                    name: this.product.name,
                    price: this.product.price,
                    image: this.product.image,
                    product: this.product._id,
                    amount: 1
                }]

            }
            await axiosClient.post('orders',
                newOrder,
                {
                    headers: { 'Authorization': `Bearer ${this.token}` },

                }
            )
                .then(() => {
                    this.$router.replace("/");
                    sweetalert({
                        text: "Order placed Successfully!",
                        icon: "success"
                    });
                }).catch(err => {
                    console.log(err);
                })
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");
        this.loadproduct();

    }
}
</script>