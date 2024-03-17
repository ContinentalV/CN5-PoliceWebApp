// Sidebar.tsx
import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import logoHome from "../../assets/img/home.png"
import logoIcon from "../../assets/img/logsIcon1.png"
import {useAuth} from "../../contexte/AuthContext";

const lspdLogo = "https://cdn.discordapp.com/icons/621708442297434130/d69f1a64bc00360f0d563dba08d5cb9e.png?size=1024"
const bcsoLogo = "https://cdn.discordapp.com/icons/1147211942663032942/24c5f2955ee923ab559d68cbf482f231.png?size=1024"

interface SidebarProps {
    isCollapsed: boolean;
    setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({isCollapsed, setIsSidebarCollapsed}) => {
    const handleToggle = () => setIsSidebarCollapsed(!isCollapsed);
    const location = useLocation(); // Utilisation de useLocation pour obtenir le chemin actuel
    const {user} = useAuth()
    const avatarUser = user?.avatar

    // Fonction pour vérifier si le chemin est actif
    const isActive = (pathname: string) => location.pathname === pathname;

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <button onClick={handleToggle} className={`toggle-btn ${isCollapsed ? 'collapsed' : 'nocolapse'}`}>
                    <i style={{color: `${!isCollapsed && "white"}`, fontWeight: "bold"}}
                       className={`bi ${isCollapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
                </button>

                <div className="container-profile-sidebar-info">
                    <img
                        src={avatarUser}
                        alt="Logo" className={`logo ${isCollapsed ? 'collapsed' : ''}`}/>
                    <p className="sidebar-header-username"> {user?.username} - {user?.nomRP}</p>
                    <img src={user?.codeMetier === "LSPD" ? lspdLogo : bcsoLogo}
                         className="logo sidebar-header-metier"/>


                </div>

            </div>
            <nav className={isCollapsed ? 'hidden' : ''}>
                <ul>
                    <li className={isActive("/home") ? "active" : ""}>
                        <NavLink to="/home">
                            <img
                                src={logoHome}
                                className="icon"/>
                            <p> {!isCollapsed && "Home"}</p>
                        </NavLink>
                    </li>

                    {user?.codeMetier.toLowerCase() === "bcso" && <li className={isActive("/bcso") ? "active" : ""}>
                        <NavLink to="/bcso">
                            <img
                                src={bcsoLogo}
                                className="icon"/>
                            <p> {!isCollapsed && "Bcso"}</p>
                        </NavLink>
                    </li>}

                    {user?.codeMetier.toLowerCase() === "lspd" && <li className={isActive("/lspd") ? "active" : ""}>
                        <NavLink to="/lspd">
                            <img
                                src={lspdLogo}
                                className="icon"/>
                            <p> {!isCollapsed && "Lspd"}</p>
                        </NavLink>
                    </li>}

                    <div>

                    </div>

                    <li className={isActive("/logs") ? "active" : ""}>
                        <NavLink to="/logs">
                            <img
                                src={logoIcon}
                                className="icon logs"/>
                            <p> {!isCollapsed && "Logs"}</p>
                        </NavLink>
                    </li>
                    {/* Add more list items here if necessary */}
                </ul>
            </nav>

            <hr/>
            <div className="placebo">
                <h4> {isCollapsed ? <SidebarFooterCollapsed/> : <SidebarFooterNoCollapsed/>} </h4>
            </div>

        </aside>
    );
};

export default Sidebar;

const SidebarFooterCollapsed = () => {

    return (
        <div className="footer-sidebar-collapsed">
            <i className="bi bi-discord"></i>

        </div>
    )
}
const SidebarFooterNoCollapsed = () => {

    return (
        <div className="footer-sidebar-no-collapsed">

            <small className="created-footer">© 2024 - Neo.getsu / Police's Manager Continental V.</small>
            <small className="created-footer"> Tous droits réservés.</small>
            <div className="contact">
                <i className="bi bi-discord"> </i>
                <small className="created-footer"> neo.getsu</small>
            </div>


        </div>
    )
}