import type { ReactNode } from "react"
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

interface propTypes {
    children: ReactNode;
}


export const ProtectedRoute = ( props : propTypes ) => {
    const {children} = props;

    const auth = localStorage.getItem('auth');
    
    const currentRoute = useLocation().pathname;
    

    if( !auth && currentRoute !== '/' ) {
        return <Navigate to="/" replace/>
    }

    if( auth && currentRoute === '/' ) {
        return <Navigate to="/orders" replace/>
    }

    return <>{children}</>
}