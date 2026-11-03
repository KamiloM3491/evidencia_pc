import React, { createContext, useContext, useState } from "react";

// Crear contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Cerrar sesión
    const logout = () => {
        console.log("[Auth] Cerrando sesión del usuario.");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};