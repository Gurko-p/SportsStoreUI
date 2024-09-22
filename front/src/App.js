import React from "react"
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
} from "react-router-dom"
import UserList from "./components/admin/UserList"
import Admin from "./components/admin/Admin"
import ProductList from "./components/sportsstore/ProductList"
import SportsPage from "./components/sportsstore/SportsPage"
import LoginPage from "./components/auth/LoginPage"
import About from "./components/navMenu/About";
import Register from "./components/navMenu/Register";
import Cart from "./components/cart/Cart"

import store from "./app/store"
import { checkLoggedIn } from "./features/auth/authSlice"
import MainLayout from "./components/layout/MainLayout"

const router = createBrowserRouter([
  { path: "/", 
    Component: MainLayout, 
    children: [
      { index: true, Component: SportsPage },
      { path: "about", Component: About },
      { path: "register", Component: Register },
      { path: "admin", Component: Admin },
      { path: "cart", Component: Cart },
    ], 
    loader: protectedLoader
  },
  { path: "/login", Component: LoginPage },
])

function App(){ return <RouterProvider router={router} />}

export default App

async function protectedLoader({ request }) {
  await store.dispatch(checkLoggedIn())
  const state = store.getState()
  const isLoggedIn = state.auth.isLoggedIn

  if (!isLoggedIn) {
    let params = new URLSearchParams()
    params.set("from", new URL(request.url).pathname)
    return redirect("/login?" + params.toString())
  }
  return null
}