import type { RouteObject } from "react-router-dom";
import Login from "../pages/Login"
import Orders from "../pages/ListOrder";
import { ProtectedRoute } from "./ProtectedRoute";
import DetailOrder from "../pages/DetailOrder";
import CreateOrder from "../pages/CreateOrder";


const route: RouteObject[] = [

    {
        path: '/',
        element: <ProtectedRoute>
                    <Login />
                </ProtectedRoute> 
    },
    {
        path: '/orders',
        element: <ProtectedRoute>
                    <Orders />
                </ProtectedRoute>
    },
    {
        path: '/orders/:id',
        element: <ProtectedRoute>
                    <DetailOrder />
                </ProtectedRoute>
    },
    {
        path: '/create',
        element: <ProtectedRoute>
                    <CreateOrder />
                </ProtectedRoute>
    }
];

export default route;