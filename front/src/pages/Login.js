
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import userService from "../services/userService";
import { useAuth } from "../context/AuthContext";

import "../styles/pages/Login.css";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        correo: "",
        contrasena: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // -- Actualizar campos del formulario --
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setError("");
    };

    // -- Enviar formulario de inicio de sesión --
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.correo.trim() || !formData.contrasena) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            console.log(
                "[Login] Iniciando proceso de autenticación para:",
                formData.correo
            );

            const response = await userService.loginUser({
                correo: formData.correo.trim(),
                contrasena: formData.contrasena,
            });

            console.log("[Login] Autenticación exitosa:", response.user);

            // Guardar los datos del usuario en el contexto global
            setUser(response.user);

            // Redirigir al perfil
            navigate("/perfil");

        } catch (error) {
            console.error("[Login] No fue posible iniciar sesión:", error);
            setError(
                error.message ||
                "No fue posible iniciar sesión. Inténtalo nuevamente."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login-page">
            <div className="login-container">

                <div className="login-header">
                    <h1>¡Qué bueno tenerte de vuelta!</h1>
                    <p>
                        Ingresa a tu cuenta y descubre nuestras pequeñas creaciones.
                    </p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="login-field">
                        <label htmlFor="correo">Correo electrónico</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            placeholder="Ingresa tu correo electrónico"
                            value={formData.correo}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="contrasena">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            placeholder="Ingresa tu contraseña"
                            value={formData.contrasena}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && (
                        <p className="login-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Ingresando..." : "Iniciar sesión"}
                    </button>

                </form>

                <div className="login-register">
                    <p>¿Todavía no tienes una cuenta?</p>
                    <Link to="/registro" className="login-register-button">
                        Registrarme
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default Login;
