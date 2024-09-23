import axiosInstance from "./axiosInstance"
import { urls } from './urls';

export const ordersApi = {
    async getProducts() {
        return axiosInstance.get(urls.orders.list)
    },
    async createOrder(order) {
        return axiosInstance.post(urls.orders.create, order)
    },
    async createOrderCarts(order) {
        return axiosInstance.post(urls.orders.createOrderCarts, order)
    },
}