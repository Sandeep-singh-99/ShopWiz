import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../screen/Home";
import Login from "../components/Login";
import Register from "../components/SignUp";
import Profile from "../screen/Profile";
import AdminLogin from "../screen/admin/AdminLogin";
import AdminHome from "../screen/admin/AdminHome";
import Product from "../screen/admin/Product";
import User from "../screen/admin/User";
import Order from "../screen/admin/Order";
import CategoryProduct from "../screen/CategoryProduct";
import ProductDetails from "../screen/ProductDetails";
import CartPage from "../screen/CartPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "profile",
                element: <Profile/>
            },

            {
                path: "category/:categoryName",
                element: <CategoryProduct/>
            },
            {
                path: "product/:id",
                element: <ProductDetails/>
            },
            {
                path: "cart",
                element: <CartPage/>
            }
        ],
    },

    {
        path: "admin-login",
        element: <AdminLogin/>
    },

    {
        path: "admin",
        element: <AdminHome/>,
        children: [
            {
                path: "product",
                element: <Product/>
            },
            {
                path: "user",
                element: <User/>
            },
            {
                path: "order",
                element: <Order/>
            }
        ]
    }
])

export default router;