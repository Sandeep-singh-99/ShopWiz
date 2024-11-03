import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../screen/Home";
import Login from "../components/Login";
import Register from "../components/SignUp";

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
            }
        ]
    }
])

export default router;