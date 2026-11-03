
import React from 'react';
import { Link } from 'react-router-dom';
// import './Home.css';
import '../styles/pages/Home.css';

function Home() {
    return (
        <div className="home">

            {/* Sección principal / Hero */}
            <section className="home-hero">

                <div className="hero-content">

                    <span className="hero-subtitle">
                        Creaciones hechas a mano
                    </span>

                    <h1>
                        Pequeñas criaturas,
                        <br />
                        grandes sonrisas
                    </h1>

                    <p>
                        Descubre un mundo de ternura y creatividad
                        a través de nuestros amigurumis y tejidos
                        artesanales.
                    </p>

                    <Link to="/registro" className="hero-button">
                        Crear una cuenta
                    </Link>

                </div>

                <div className="hero-decoration">
                    <span className="hero-decoration-icon">🧸</span>
                    <span className="hero-decoration-small">🧶</span>
                    <span className="hero-decoration-heart">♡</span>
                </div>

            </section>


            {/* Presentación del emprendimiento */}
            <section className="home-about">

                <div className="section-heading">

                    <span className="section-subtitle">
                        Conoce nuestro mundo
                    </span>

                    <h2>Un pequeño mundo tejido con amor</h2>

                    <p>
                        En Pequeñas Criaturas creemos que cada creación
                        puede convertirse en un recuerdo especial.
                        Por eso elaboramos nuestros tejidos con dedicación,
                        creatividad y atención a cada detalle.
                    </p>

                </div>

            </section>


            {/* Características */}
            <section className="home-features">

                <div className="section-heading">

                    <span className="section-subtitle">
                        Nuestra esencia
                    </span>

                    <h2>¿Qué nos hace especiales?</h2>

                </div>

                <div className="features-container">

                    <article className="feature-card">
                        <div className="feature-icon">🧶</div>

                        <h3>Hecho a mano</h3>

                        <p>
                            Cada pieza es elaborada artesanalmente,
                            cuidando sus detalles y acabados.
                        </p>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon">💜</div>

                        <h3>Hecho con cariño</h3>

                        <p>
                            Creamos cada personaje con dedicación
                            y pasión por el tejido.
                        </p>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon">🎁</div>

                        <h3>Detalles especiales</h3>

                        <p>
                            Creaciones ideales para regalar y
                            compartir momentos especiales.
                        </p>
                    </article>

                </div>

            </section>


            {/* Invitación al registro */}
            <section className="home-register">

                <h2>¡Forma parte de nuestro pequeño mundo!</h2>

                <p>
                    Crea tu cuenta y descubre todo lo que
                    Pequeñas Criaturas tiene para ofrecerte.
                </p>

                <Link to="/registro" className="register-button">
                    Registrarme
                </Link>

            </section>

        </div>
    );
}

export default Home;
