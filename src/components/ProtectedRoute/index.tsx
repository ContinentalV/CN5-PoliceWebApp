import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../../contexte/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    codeMetier?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, codeMetier}) => {
    const {user, isLoading} = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Chargement.</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }


    if (codeMetier && user.codeMetier.toLowerCase() !== codeMetier.toLowerCase()) {
        return <Navigate to={'/' + user.codeMetier.toLowerCase()} replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
