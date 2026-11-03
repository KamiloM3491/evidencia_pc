
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Footer.css';

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Información de la tienda */}
                <div className="footer-about">
                    <h2>Pequeñas Criaturas</h2>

                    <p>
                        Creaciones tejidas a mano con dedicación,
                        creatividad y mucho cariño.
                    </p>
                </div>

                {/* Enlaces de navegación */}
                <div className="footer-links">
                    <h3>Enlaces rápidos</h3>

                    <Link to="/">Inicio</Link>
                    <Link to="/registro">Crear cuenta</Link>
                    <Link to="/login">Iniciar sesión</Link>
                </div>

                {/* Información de contacto */}
                <div className="footer-contact">
                    <h3>Contáctanos</h3>

                    <p>¿Tienes alguna pregunta?</p>
                    <p>Pronto encontrarás aquí nuestros canales de contacto.</p>
                </div>

            </div>

            {/* Derechos reservados */}
            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} Pequeñas Criaturas.
                    Todos los derechos reservados.
                </p>
            </div>

        </footer>
    );
}

export default Footer;
