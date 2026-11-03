
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import userService from "../services/userService";
import { useAuth } from "../context/AuthContext";

import "../styles/pages/UpdateProfile.css";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const [formData, setFormData] = useState({
        nombre: user?.nombre || "",
        apellido: user?.apellido || "",
        correo: user?.correo || "",
        telefono: user?.telefono || "",
        direccion: user?.direccion || "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [updatedUser, setUpdatedUser] = useState(null);

    // -- Actualizar campos del formulario --
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setError("");
    };

    // -- Solicitar confirmación antes de actualizar --
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!user?._id) {
            setError("No se encontró el identificador del usuario.");
            console.error("[Actualización] ID del usuario no disponible.");
            return;
        }

        console.log("[Actualización] Se solicitará confirmación al usuario.");

        setError("");
        setShowConfirmation(true);
    };

    // -- Confirmar y ejecutar actualización --
    const handleConfirmUpdate = async () => {
        try {
            setLoading(true);
            setError("");

            console.log(
                "[Actualización] Usuario confirmó la operación:",
                user._id
            );

            const response = await userService.updateUser(
                user._id,
                formData
            );

            console.log(
                "[Actualización] Respuesta exitosa:",
                response.user
            );

            // Actualizar el usuario en el contexto global
            setUser(response.user);

            setUpdatedUser(response.user);
            setShowConfirmation(false);
            setShowSuccess(true);

        } catch (error) {
            console.error("[Actualización] Error al actualizar:", error);

            setShowConfirmation(false);

            setError(
                error.message || "No fue posible actualizar los datos."
            );
        } finally {
            setLoading(false);
        }
    };

    // -- Cancelar actualización --
    const handleCancelUpdate = () => {
        console.log("[Actualización] El usuario canceló la operación.");

        setShowConfirmation(false);
    };

    // -- Regresar al perfil después de actualizar --
    const handleSuccessConfirmation = () => {
        console.log(
            "[Actualización] Regresando al perfil con los datos actualizados."
        );

        navigate("/perfil", {
            replace: true,
        });
    };

    // -- Verificar que exista un usuario con sesión iniciada --
    if (!user) {
        console.warn("[Actualización] No existe un usuario con sesión iniciada.");

        return <Navigate to="/login" replace />;
    }

    return (
        <section className="updateprofile-page">
            <div className="updateprofile-container">

                <div className="updateprofile-header">
                    <h1>Actualizar mis datos</h1>
                    <p>Modifica la información de tu cuenta.</p>
                </div>

                <form className="updateprofile-form" onSubmit={handleSubmit}>

                    <div className="updateprofile-field">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateprofile-field">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateprofile-field">
                        <label htmlFor="correo">Correo electrónico</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateprofile-field">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateprofile-field updateprofile-field-full">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && (
                        <p className="updateprofile-error" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="updateprofile-actions">

                        <button
                            type="submit"
                            className="updateprofile-button"
                            disabled={loading}
                        >
                            Guardar cambios
                        </button>

                        <Link
                            to="/perfil"
                            className="updateprofile-cancel"
                        >
                            Cancelar
                        </Link>

                    </div>

                </form>
            </div>

            {/* -- Popup de confirmación previa -- */}
            {showConfirmation && (
                <div className="updateprofile-modal-overlay">
                    <div
                        className="updateprofile-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="updateprofile-confirm-title"
                    >
                        <div className="updateprofile-modal-icon">
                            ?
                        </div>

                        <h2 id="updateprofile-confirm-title">
                            ¿Confirmar actualización?
                        </h2>

                        <p>
                            ¿Estás seguro de que deseas actualizar los datos de tu cuenta?
                        </p>

                        <div className="updateprofile-modal-actions">

                            <button
                                type="button"
                                className="updateprofile-modal-button"
                                onClick={handleConfirmUpdate}
                                disabled={loading}
                            >
                                {loading ? "Actualizando..." : "Sí, actualizar"}
                            </button>

                            <button
                                type="button"
                                className="updateprofile-modal-cancel"
                                onClick={handleCancelUpdate}
                                disabled={loading}
                            >
                                No, cancelar
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {/* -- Popup de actualización exitosa -- */}
            {showSuccess && (
                <div className="updateprofile-modal-overlay">
                    <div
                        className="updateprofile-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="updateprofile-success-title"
                    >
                        <div className="updateprofile-modal-icon updateprofile-success-icon">
                            ✓
                        </div>

                        <h2 id="updateprofile-success-title">
                            ¡Datos actualizados!
                        </h2>

                        <p>
                            La información de tu perfil se ha actualizado correctamente.
                        </p>

                        <button
                            type="button"
                            className="updateprofile-modal-button"
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

export default UpdateProfile;
