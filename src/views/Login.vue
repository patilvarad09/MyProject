<template>
    <h2 v-if="!token" class="p-10 text-center font-bold text-3xl text-orange-500">Sign In here</h2>
    <div class="p-4 text-center bg-white transition-all">
        <form v-if="!token">
            <div class="p-3 form-group">
                <input type="email" v-model="email"
                    class="form-control bg-white shadow rounded-xl hover:scale-105 transition-all" placeholder="Email"
                    required />
            </div>
            <div class="p-3 form-group">
                <input type="password" v-model="password"
                    class="form-control bg-white shadow rounded-xl hover:scale-105 transition-all"
                    placeholder="Password" required />
            </div>
            <div class="text-center p-4 form-group">
                <button type="button" @click="login"
                    class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-12 border border-orange-700 rounded-xl">
                    Sign In
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import axiosClient from '../axiosClient';
import sweetalert from 'sweetalert';


export default {

    data() {
        return {
            email: null,
            password: null,
            token: null
        };
    },
    methods:
    {
        async login(e) {
            e.preventDefault();
            const body = {
                email: this.email,
                password: this.password
            };
            await axiosClient.post('users/login', body)

                .then((res) => {
                    
                    this.$router.replace("/");
                    localStorage.setItem("token", res.data.token)
                    // location.reload()
                    sweetalert({
                        text: "User Logged In Successfully!",
                        icon: "success"
                    });
                    this.$router.replace("/");
                }).catch(err => {
                    console.log(err);
                    sweetalert({
                        text: "Invalid Credentials",
                        icon: "error"
                    })
                })
        }
    },
    mounted() {
        this.token = localStorage.getItem("token")
    }
}    
</script>