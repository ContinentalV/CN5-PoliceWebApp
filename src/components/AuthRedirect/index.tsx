import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexte/AuthContext';

const AuthRedirect = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            // Utilisateur authentifié, naviguer vers /home
            navigate('/home', { replace: true });
        } else {
            // Utilisateur non authentifié, naviguer vers /login
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

    return null; // Ce composant ne rend rien visuellement
};

export default AuthRedirect