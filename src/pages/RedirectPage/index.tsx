import React, {useContext, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../contexte/AuthContext';
import axiosInstance from "../../utils/axiosConfig"; // Assurez-vous que le chemin d'accès est correct

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
            axios.defaults.withCredentials = true;
            const response = await axios.post('https://continentalv.fr/auth/token', {code});
            console.log(response.data)
            const {accessToken, refreshToken, expiresIn, discordId, user} = response.data;
            console.log("La response st passer")
            // Ici, vous pouvez stocker accessToken et refreshToken comme nécessaire
            localStorage.setItem('accessToken', accessToken);

            // Mettre à jour l'état de l'utilisateur dans le contexte d'authentification
            setUser(user); // Supposant que 'user' est l'objet utilisateur retourné par votre API

            // Redirection vers la page d'accueil une fois l'authentification terminée
            navigate('/home');
        } catch (error) {
            console.error(error);
            // Gérer l'erreur, peut-être rediriger vers une page d'erreur ou afficher un message
            navigate('/login', {replace: true});
        }
    };

    return <div>Redirection et authentification en cours...</div>;
};

export default RedirectPage;
