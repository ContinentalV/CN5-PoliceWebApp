import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from './contexte/AuthContext';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import RedirectPage from './pages/RedirectPage';
import PolicePage from './pages/PolicePage';
import PoliceBCSOPage from './pages/PoliceBCSOPage';
import "./styles/main.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

const App = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const {user} = useAuth()


    useEffect(() => {
        setIsAuthenticated(user !== null)
    }, [user]);

    return (

        <Router>

            <div className={`app ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <div className="background">
                    <div className="blur-background"></div>
                    <div className={`main-content ${isSidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
                        <div className="content-wrapper">
                            <Routes>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/redirectPage" element={<RedirectPage/>}/>
                                <Route path="/home" element={
                                    <ProtectedRoute><Home/></ProtectedRoute>
                                }/>
                                <Route path="/lspd" element={
                                    <ProtectedRoute codeMetier={"lspd"}><PolicePage/></ProtectedRoute>
                                }/>
                                {<Route path="/bcso" element={
                                    <ProtectedRoute codeMetier={"bcso"}><PoliceBCSOPage/></ProtectedRoute>
                                }/>}

                            </Routes>
                        </div>
                    </div>
                </div>
                {user ?
                    <Sidebar isCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed}/> : null}
                {user ? <Header isSidebarCollapsed={isSidebarCollapsed}/> : null}

            </div>
        </Router>

    );
};


// AuthVerification composant pour vérifier l'état d'authentification au démarrage de l'app

const AuthVerification = () => {
    const navigate = useNavigate();
    const {user, setUser} = useAuth();

    useEffect(() => {
        const verifyAuthentication = async () => {
            try {
                const response = await axios.get('https://continentalv.fr/auth/verify', {withCredentials: true});
                if (response.status === 200 && response.data.user) {
                    setUser(response.data.user);
                } else {
                    //   navigate('/login');
                }
            } catch (error) {
                // navigate('/login');
            }
        };

        if (!user) verifyAuthentication();
    }, [user, setUser, navigate]);

    return null; // Ce composant ne rend rien visuellement
};

export default App;
