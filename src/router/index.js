import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Orders from '../views/Orders.vue'
import Account from '../views/Account.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import ProductDetails from '../views/ProductDetails.vue'
import BuyNow from '../views/BuyNow.vue'
import OrderDetails from '../views/OrderDetails.vue'
const routes = [
    {
        path:'/',
        name:'home',
        component: Home,
    },
    {
        path:'/home/:id',
        name: 'productdetails',
        component: ProductDetails
    },
    {
        path:'/home/buynow/:id',
        name: 'buynow',
        component: BuyNow
    },
    {
        path:'/orders',
        name:'orders',
        component: Orders
    },
    {
        path: '/orders/:id',
        name: 'orderdetails',
        component: OrderDetails
    },
    {
        path:'/signup',
        name:'signup',
        component: SignUp
    },
    {
        path:'/login',
        name:'login',
        component: Login
    },
    {
        path:'/account',
        name:'account',
        component: Account
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router