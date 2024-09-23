import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../sportsstore/Product";
import { Container, Button, Box, TextField } from '@mui/material';
import { countProductsInCartChange, authUser } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { ordersApi } from '../../api/ordersAPI';
import { alertService, severityType } from '../snackBar/alertService'

export default function Order() {

    const navigate = useNavigate();
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const user = useSelector(authUser);

    useEffect(() => {
        let cartsArray = JSON.parse(localStorage.getItem("cart")) ?? [];
        setCarts(cartsArray);
        let totalSum = calculateTotalCost(cartsArray);
        setTotal(totalSum);
    }, []);

    function calculateTotalCost(arr) {
        return () => arr.reduce((accumulator, product) => {
            console.log("calculateTotalCost");
            return accumulator + (product.price);
        }, 0);

    }

    function removeHandler(id) {
        let arr = carts.filter(cart => cart.id !== id);
        setCarts(arr);
        let totalSum = calculateTotalCost(arr);
        setTotal(totalSum);
    }

    const makeOrder = async () => {
        localStorage.removeItem("cart")
        dispatch(countProductsInCartChange(0));
        const addedCarts = []; 
        carts.forEach(cart => {
            addedCarts.push({ quantity: 1, productId: cart.id });
        });
        let order = { userId: user.userName, address: address, carts: addedCarts };
        let createdOrder;
        try{
            createdOrder = await ordersApi.createOrderCarts(order);
        }
        catch(error){
            alertService.show("Ошибка при оформлении заказа!", severityType.error);
            return;
        }
        
        alertService.show(`Ваш заказ №${createdOrder.data.id} успешно сформирован!`, severityType.success)
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
            <Container>
                <div style={{ textAlign: 'center' }}>
                    <h2>Оформление заказа</h2>
                    <div style={{ fontSize: '25px' }}>Общая сумма заказа <strong>{total}BYN</strong></div>
                    <h2>Введите адрес доставки:</h2>
                    <Box>
                        <TextField
                            label="Введите адрес доставки"
                            sx={{ minWidth: "400px", maxWidth: "400px" }}
                            variant="outlined"
                            margin="normal"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Box>
                    <h2>Состав заказа:</h2>
                    <div style={{ display: 'inline-block' }}>
                        {carts.map((product) => (
                            <div key={product.id}>
                                <Product product={product} onRemove={removeHandler} />
                            </div>
                        ))}
                    </div>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button
                            type='primary'
                            variant="contained"
                            color={"warning"}
                            onClick={async () => await makeOrder()}
                        >
                            Оформить заказ
                        </Button>
                    </Box>
                </div>
            </Container>
        </div>
    );
}