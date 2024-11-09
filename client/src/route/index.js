import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../screen/Home";
import Login from "../components/Login";
import Register from "../components/SignUp";
import Profile from "../screen/Profile";
import AdminLogin from "../screen/admin/AdminLogin";

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
                path: "admin-login",
                element: <AdminLogin/>
            }
        ]
    }
])

export default router;