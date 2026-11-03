
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/components/Navbar.css";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // -- Cerrar sesión --
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                {/* Logo y nombre de la tienda */}
                <Link to="/" className="navbar-brand">
                    <span className="navbar-brand-name">
                        Pequeñas Criaturas
                    </span>
                </Link>

                {/* Menú de navegación */}
                <div className="navbar-menu">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "navbar-link active" : "navbar-link"
                        }
                        end
                    >
                        Inicio
                    </NavLink>

                    {!user ? (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? "navbar-link active" : "navbar-link"
                                }
                            >
                                Iniciar sesión
                            </NavLink>

                            <Link
                                to="/registro"
                                className="navbar-register"
                            >
                                Crear cuenta
                            </Link>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/perfil"
                                className={({ isActive }) =>
                                    isActive ? "navbar-link active" : "navbar-link"
                                }
                            >
                                Mi Perfil
                            </NavLink>

                            <button
                                type="button"
                                className="navbar-register"
                                onClick={handleLogout}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
