import React, {useContext, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../contexte/AuthContext';
import axiosInstance from "../../utils/axiosConfig";
import {sendRequest} from "../../functions"; // Assurez-vous que le chemin d'accès est correct

const RedirectPage = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext); // Utilisez useContext pour accéder à setUser

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        console.log("on a hit la redirect page " + code)
        if (code) {
            exchangeCodeForToken(code);
        }
    }, []);

    const exchangeCodeForToken = async (code: string) => {
        try {

            const response = await sendRequest("post", "auth/token", {code})
            console.log(response)
            const {accessToken, refreshToken, expiresIn, discordId, user} = response;
            localStorage.setItem('accessToken', accessToken);
            setUser(user);
            navigate('/home');
        } catch (error) {
            console.error(error);
            navigate('/login', {replace: true});
        }
    };

    return <div>Redirection et authentification en cours...</div>;
};

export default RedirectPage;
