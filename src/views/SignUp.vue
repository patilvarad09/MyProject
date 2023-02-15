<template>
    <div>
        <h2 class="p-4 text-center font-bold text-3xl text-orange-500">Create an Account </h2>
        <form>
            <div class="p-4 text-center bg-white transition-all">
                <div class="p-3 form-group"><input type="text" v-model="username"
                        class="form-control bg-white shadow rounded-xl hover:scale-105 transition-all"
                        placeholder="Username" required /></div>
                <div class="p-3 form-group">
                    <input type="email" v-model="email"
                        class="form-control bg-white shadow rounded-xl hover:scale-105 transition-all"
                        placeholder="Email" required />
                </div>
                <div class="p-3 form-group">
                    <input type="password" v-model="password"
                        class="form-control bg-white shadow rounded-xl hover:scale-105 transition-all"
                        placeholder="Password" required />
                </div>
                <div class="p-3 form-group">
                    <input type="password" v-model="passwordConfirm"
                        class="form-control bg-white shadow rounded-xl hover:scale-105 transition-all"
                        placeholder="Confirm Password" required />
                </div>

                <div class="text-center p-4">
                    <button type="button" @click="signup"
                        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-12 border border-orange-700 rounded-xl">
                        Create Account
                    </button>
                </div>
            </div>
        </form>
        <div class="px-1 py-4 text-center bg-white transition-all" v-if="!token">
            <p class="mb-4">Already have Account ?</p>
            <router-link to="/login"
                class="font-bold text-center px-20 py-2 text-white rounded-xl border-2 border-orange-600 bg-orange-500 hover:bg-orange-600 transition-all">Login</router-link>
        </div>
    </div>
</template>
<script>
import axiosClient from '../axiosClient';
import sweetalert from 'sweetalert';


export default {

    data() {
        return {
            email: null,
            username: null,
            password: null,
            passwordConfirm: null,
            token: null
        };
    },
    methods:
    {
        async signup(e) {
            e.preventDefault();
            if (this.password === this.passwordConfirm) {
                const newUser = {
                    name: this.username,
                    email: this.email,
                    password: this.password
                };
                await axiosClient.post('users/', newUser)

                    .then(() => {
                        this.$router.replace("/login");
                        sweetalert({
                            text: "Account created Successfully!",
                            icon: "success"
                        });
                    }).catch(err => {
                        console.log(err);
                    })
            } else {
                sweetalert({
                    text: "Password Does not match!",
                    icon: "error"
                })
            }
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");
    }
}
</script>