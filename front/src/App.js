
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import UpdateProfile from "./pages/UpdateProfile";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="App">

                    <Navbar />

                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro" element={<Register />} />
                            <Route path="/perfil" element={<UserProfile />} />
                            <Route path="/perfil/actualizar" element={<UpdateProfile />} />
                        </Routes>
                    </main>

                    <Footer />

                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;


