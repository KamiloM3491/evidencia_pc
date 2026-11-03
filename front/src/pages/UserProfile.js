
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import userService from "../services/userService";

import "../styles/pages/UserProfile.css";

const UserProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // -- Solicitar confirmación antes de eliminar --
    const handleDeleteRequest = () => {
        if (!user?._id) {
            setError("No se encontró el identificador del usuario.");
            console.error("[Eliminación] ID del usuario no disponible.");
            return;
        }

        setError("");
        setShowConfirmation(true);

        console.log("[Eliminación] Se solicitará confirmación al usuario.");
    };

    // -- Confirmar y ejecutar eliminación --
    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            setError("");

            console.log(
                "[Eliminación] Usuario confirmó la operación:",
                user._id
            );

            await userService.deleteUser(user._id);

            console.log("[Eliminación] Cuenta eliminada correctamente.");

            setShowConfirmation(false);
            setShowSuccess(true);

        } catch (error) {
            console.error("[Eliminación] No fue posible eliminar la cuenta:", error);

            setShowConfirmation(false);
            setError(
                error.message || "No fue posible eliminar la cuenta."
            );

        } finally {
            setLoading(false);
        }
    };

    // -- Cancelar eliminación --
    const handleCancelDelete = () => {
        console.log("[Eliminación] El usuario canceló la operación.");
        setShowConfirmation(false);
    };

    // -- Cerrar sesión y regresar al inicio después de eliminar --
    const handleSuccessConfirmation = () => {
        console.log("[Eliminación] Cerrando sesión y regresando al inicio.");

        logout();
        navigate("/", { replace: true });
    };

    // -- Verificar que exista un usuario con sesión iniciada --
    if (!user) {
        console.warn("[UserProfile] No existe un usuario con sesión iniciada.");

        return <Navigate to="/login" replace />;
    }

    console.log("[UserProfile] Datos del usuario:", user);

    return (
        <section className="userprofile-page">
            <div className="userprofile-container">

                <div className="userprofile-header">
                    <h1>Mi perfil</h1>
                    <p>¡Bienvenido/a a Pequeñas Criaturas!</p>
                </div>

                <div className="userprofile-avatar">
                    <span>
                        {user.nombre?.charAt(0).toUpperCase()}
                    </span>
                </div>

                <div className="userprofile-information">

                    <div className="userprofile-field">
                        <label>Nombre</label>
                        <p>{user.nombre}</p>
                    </div>

                    <div className="userprofile-field">
                        <label>Apellido</label>
                        <p>{user.apellido}</p>
                    </div>

                    <div className="userprofile-field">
                        <label>Correo electrónico</label>
                        <p>{user.correo}</p>
                    </div>

                    <div className="userprofile-field">
                        <label>Teléfono</label>
                        <p>{user.telefono}</p>
                    </div>

                    <div className="userprofile-field">
                        <label>Dirección</label>
                        <p>{user.direccion}</p>
                    </div>

                    <div className="userprofile-field">
                        <label>Estado de la cuenta</label>
                        <p>{user.estadoUsuario}</p>
                    </div>

                </div>

                {error && (
                    <p className="userprofile-error" role="alert">
                        {error}
                    </p>
                )}

                <div className="userprofile-actions">

                    <Link
                        to="/perfil/actualizar"
                        className="userprofile-button"
                    >
                        Actualizar mis datos
                    </Link>

                    <button
                        type="button"
                        className="userprofile-delete-button"
                        onClick={handleDeleteRequest}
                        disabled={loading}
                    >
                        Eliminar cuenta
                    </button>

                    <Link to="/" className="userprofile-home-link">
                        Volver al inicio
                    </Link>

                </div>

            </div>

            {/* -- Popup de confirmación previa -- */}
            {showConfirmation && (
                <div className="userprofile-modal-overlay">
                    <div
                        className="userprofile-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="userprofile-confirm-title"
                    >
                        <div className="userprofile-modal-icon userprofile-warning-icon">
                            !
                        </div>

                        <h2 id="userprofile-confirm-title">
                            ¿Eliminar tu cuenta?
                        </h2>

                        <p>
                            Esta acción eliminará permanentemente tu cuenta
                            y no podrás recuperar tus datos. ¿Estás seguro
                            de que deseas continuar?
                        </p>

                        <div className="userprofile-modal-actions">

                            <button
                                type="button"
                                className="userprofile-modal-button userprofile-modal-delete"
                                onClick={handleConfirmDelete}
                                disabled={loading}
                            >
                                {loading ? "Eliminando..." : "Sí, eliminar"}
                            </button>

                            <button
                                type="button"
                                className="userprofile-modal-button userprofile-modal-cancel"
                                onClick={handleCancelDelete}
                                disabled={loading}
                            >
                                No, cancelar
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {/* -- Popup de eliminación exitosa -- */}
            {showSuccess && (
                <div className="userprofile-modal-overlay">
                    <div
                        className="userprofile-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="userprofile-success-title"
                    >
                        <div className="userprofile-modal-icon userprofile-success-icon">
                            ✓
                        </div>

                        <h2 id="userprofile-success-title">
                            ¡Cuenta eliminada!
                        </h2>

                        <p>
                            Tu cuenta ha sido eliminada correctamente.
                            Gracias por haber formado parte de Pequeñas Criaturas.
                        </p>

                        <button
                            type="button"
                            className="userprofile-modal-button userprofile-modal-delete"
                            onClick={handleSuccessConfirmation}
                        >
                            Aceptar
                        </button>

                    </div>
                </div>
            )}

        </section>
    );
};

export default UserProfile;
