import React, { useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, AuthState } from './AuthProvider';

export interface PrivateRouteProps {
    component: React.ComponentType
    path?: string
    roles: Array<string>
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: RouteComponent, roles }) => {
    const { isAuthenticated, role } = useContext<AuthState>(AuthContext);
    const userHasRequiredRole = (isAuthenticated && roles.includes(role))

    if (isAuthenticated && userHasRequiredRole) {
         return <RouteComponent />
     }

     return <Navigate to="/" />
}
