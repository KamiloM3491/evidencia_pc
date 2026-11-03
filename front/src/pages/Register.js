
import React, { useState } from 'react';
import userService from '../services/userService';
import '../styles/pages/Register.css';

function Register() {

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: '',
        telefono: '',
        direccion: ''
    });

    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    // -- Actualizar los campos del formulario --
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // -- Registrar usuario --
    const handleSubmit = async (event) => {
        event.preventDefault();

        setMensaje('');
        setTipoMensaje('');
        setLoading(true);

        try {
            const response = await userService.registerUser(formData);

            setMensaje(response.mensaje);
            setTipoMensaje('success');

            // Limpiar formulario después del registro exitoso
            setFormData({
                nombre: '',
                apellido: '',
                correo: '',
                contrasena: '',
                telefono: '',
                direccion: ''
            });

        } catch (error) {
            setMensaje(error.message);
            setTipoMensaje('error');

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">

            <section className="register-container">

                {/* Encabezado */}
                <div className="register-heading">

                    <span className="register-subtitle">
                        ¡Nos alegra tenerte aquí!
                    </span>

                    <h1>Crea tu cuenta</h1>

                    <p>
                        Regístrate en Pequeñas Criaturas y descubre
                        nuestras creaciones artesanales.
                    </p>

                </div>

                {/* Formulario */}
                <form className="register-form" onSubmit={handleSubmit}>

                    <div className="form-row">

                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>

                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>

                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                placeholder="Ingresa tu apellido"
                                required
                            />
                        </div>

                    </div>

                    <div className="form-group">
                        <label htmlFor="correo">Correo electrónico</label>

                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            placeholder="ejemplo@correo.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contrasena">Contraseña</label>

                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            value={formData.contrasena}
                            onChange={handleChange}
                            placeholder="Crea una contraseña"
                            required
                        />
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>

                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="Ingresa tu teléfono"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="direccion">Dirección</label>

                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                placeholder="Ingresa tu dirección"
                                required
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="register-submit"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Crear cuenta'}
                    </button>

                    {/* Mensajes del registro */}
                    {mensaje && (
                        <p className={`register-message ${tipoMensaje}`}>
                            {mensaje}
                        </p>
                    )}

                </form>

            </section>

        </div>
    );
}

export default Register;