import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./views/home";
import Login, {action as loginAction} from "./views/Login";
import { PrivateRoute } from "./components/PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        action: loginAction,
    },
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                element: <PrivateRoute />,
                children: [
                    {
                        index: true,
                        element: <Home />
                    },
                ]
            }
        ],
    },
])