import React from 'react';
import axios from 'axios';

interface HeaderProps {
    isSidebarCollapsed: boolean;
    isAuthenticated?: boolean;
    onLogout?: () => void; // Ajoutez la propriété onLogout de type fonction
}

const Header: React.FC<HeaderProps> = ({isSidebarCollapsed, onLogout}) => {
    const headerClass = `header${isSidebarCollapsed ? ' collapsed' : ''}`;

    const handleLogout = async () => {
        try {

            await axios.get('http://localhost:8000/auth/logout', {withCredentials: true});
            // Appeler la fonction de déconnexion fournie en tant que prop
            if (onLogout) {
                onLogout();
            }

            window.location.href = '/login';
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);

        }
    };

    return (
        <header className={headerClass}>
            <h1 className="the-title parallax-title">Police's Manager Continental</h1>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>

        </header>
    );
};

export default Header;
