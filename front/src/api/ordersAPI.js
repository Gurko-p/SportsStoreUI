import axiosInstance from "./axiosInstance"
import { urls } from './urls';

export const ordersApi = {
    async getProducts() {
        return axiosInstance.get(urls.orders.list)
    },
}