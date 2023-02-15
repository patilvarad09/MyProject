import axiosClient from "../axiosClient";

export function loadproducts({commit}, keyword) {
    axiosClient.get(`products?name=${keyword}`)
    // .then(response=>{
    //     console.log(response.data)
    //     commit('loadProducts', response.data)
    // })
    .then(({data}) => {
        commit('loadProducts', data)
      })
}
    