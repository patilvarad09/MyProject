import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://drab-school-uniform-bee.cyclic.app/'
})

export default axiosClient;