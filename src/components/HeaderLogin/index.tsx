import React from 'react';

interface HeaderProps {
    isSidebarCollapsed: boolean;
    isAuthenticated?: boolean;
    onLogout?: () => void; // Ajoutez la propriété onLogout de type fonction
}

const HeaderLogin: React.FC<HeaderProps> = ({isSidebarCollapsed, isAuthenticated, onLogout}) => {

    return (
        <header className="loginPage">
            <h1>Police's Manager Continental</h1>
         
        </header>
    );
};

export default HeaderLogin;
