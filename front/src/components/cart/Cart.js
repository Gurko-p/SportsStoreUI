import React from "react";
import { useSelector } from "react-redux"
import { itemCountInCart } from "../../features/auth/authSlice"

export default function Cart() {
    const { length } = useSelector(itemCountInCart);

    return (
        <div>
            <button>{length}</button>
        </div>
    )
}
