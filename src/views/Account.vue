<template>

    <h2 class="p-4 text-center font-bold text-3xl text-orange-500">Your Profile </h2>
    <div v-for="prof in profile" :key="prof._id" class="text-center text-xl font-bold ">
        <div>
            <p>{{ prof._id }}</p>
            <p>{{ prof.name }}</p>
            <p>{{ prof.email }}</p>
        </div>

    </div>
    <div class="text-center p-5">
        <button type="button" @click="logout"
            class="p-3 bg-orange-500 hover:bg-orange-700 text-white font-bold text-3xl text-orange-500">Log Out</button>
    </div>
</template>
<script>
import axiosClient from '../axiosClient';
import swal from 'sweetalert';
export default {
    data() {
        return {
            token: null,
            profile: []
        }
    },
    methods: {
        async fetchProfile() {
            await axiosClient.get(`users/profile`,
                {
                    headers: { Authorization: `Bearer ${this.token}` }
                })
                .then((data) => {
                    this.profile = data;
                })
                .catch((err) => {
                    console.log("err", err);
                });
        },
        logout() {
            localStorage.removeItem("token")
            this.token = null;
            swal({
                text: "User Logged Out Successfully!",
                icon: "success"
            });
            this.$router.replace("/");
           
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");
        
        if (this.token) {
            this.fetchProfile();
        } else {
            swal({
                        text: "Please Login! U are not logged In.",
                        icon: "error"
                    });
                    this.$router.replace("/signup");
        }
    }
}
</script>