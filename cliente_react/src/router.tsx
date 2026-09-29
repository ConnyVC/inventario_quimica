import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./views/home";
import Login, {action as loginAction} from "./views/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import ReactivosCrear, { 
  action as reactivoCrearAction, 
  loader as reactivosCrearLoader 
} from "./views/ReactivosCrear";
import ReactivosEditar, {
  loader as reactivosEditarLoader,
  action as reactivosEditarAction
} from "./views/ReactivosEditar";
import { action as reactivoEliminarAction } from "./components/ReactivoFila";


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
                    {
                        path: "reactivos/crear",
                        element: <ReactivosCrear />,
                        loader: reactivosCrearLoader,
                        action: reactivoCrearAction,
                    },
                    {
                        path: "reactivos/:id/editar",
                        element: <ReactivosEditar />,
                        loader: reactivosEditarLoader,
                        action: reactivosEditarAction,
                    },
                    {
                        path: "reactivos/:id/eliminar",
                        action: reactivoEliminarAction,
                    },
                ]
            }
        ],
    },
])