import React from 'react';
import {DISCORD_CLIENT, DISCORD_REDIRECT, DISCORD_SCOPE} from '../../utils/config';

const Login = () => {
    const handleLoginClick = () => {
        const clientId = DISCORD_CLIENT;
        const redirectUri = DISCORD_REDIRECT;
        const scope = DISCORD_SCOPE;
        window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    };

    return (
        <div className="container">
            <button className="btn" onClick={handleLoginClick}><i className="bi bi-discord"></i> Se Connecter</button>
        </div>
    );
};

export default Login;
