import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {sendRequest} from "../functions";

// Assurez-vous que votre interface User est bien définie
interface User {
    discordId: string;
    username: string;
    nomRP: string;
    avatar: string;
    codeMetier: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    verifyUser: () => Promise<void>;
    logout: () => Promise<void>; // Ajouter la fonction de déconnexion
}


export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {
    },
    isLoading: true,
    verifyUser: async () => {
    },
    logout: async () => {
    },
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const verifyUser = async () => {
        setIsLoading(true);
        console.log("on est dans la partie qui verifie")
        try {
            axios.defaults.withCredentials = true;
            const response = await sendRequest("get", "auth/verify")
            console.log(response)
            if (response.user) {
                setUser(response.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.log("Erreur lors de la vérification de l'utilisateur", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await sendRequest("get", "auth/logout")
            setUser(null);
        } catch (error) {
            console.log("Erreur lors de la déconnexion", error);
        }
    };

    useEffect(() => {
        verifyUser();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, isLoading, verifyUser, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
