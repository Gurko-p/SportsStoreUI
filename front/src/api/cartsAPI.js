import axiosInstance from "./axiosInstance"
import { urls } from './urls';

export const cartsApi = {
    async getList() {
        return axiosInstance.get(urls.carts.list)
    },

    async getCart(id) {
        return axiosInstance.get(urls.carts.item(id))
    },

    async createCart(cart) {
        const cart = {
            "id": 0,
            "quantity": 1,
            "orderId": 1,
            "productId": 1
          };
        return axiosInstance.post(urls.carts.create(id), cart)
    },
}