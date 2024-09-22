import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch } from "react-redux"
import { removeLoggedIn, itemCountInCart } from "../../features/auth/authSlice"
import { useNavigate, Outlet } from "react-router-dom"
import Cart from '../cart/Cart'

export default function MainLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    
    const logout = () => {
        dispatch(removeLoggedIn())
        navigate("/login", { replace: true })
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">SportsStore</Typography>
                    <Button color="white" onClick={() => navigate('/about')}>About</Button>
                    <Button color="white" onClick={() => navigate('/')}>Products</Button>
                    <Button color="white" onClick={() => navigate('/register')}>Register</Button>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                    <Cart></Cart>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </div>
    );
};