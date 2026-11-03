const API_URL = "http://localhost:4000";

// -- Servicio Registro Usuario --
const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al registrar el usuario");
        }

        return data;

    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        throw error;
    }
};

// -- Servicio Inicio de Sesión Usuario --
const loginUser = async (loginData) => {
    try {
        console.log("[Login] Enviando solicitud:", {
            correo: loginData.correo,
            contrasena: "[OCULTA]"
        });

        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        console.log("[Login] Respuesta del servidor:", {
            status: response.status,
            data
        });

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al iniciar sesión");
        }

        return data;
    } catch (error) {
        console.error("[Login] Error:", error);
        throw error;
    }
};

// -- Servicio Actualizar Usuario --
const updateUser = async (id, userData) => {
    try {
        console.log("[Actualización] Enviando datos del usuario:", {
            id,
            ...userData
        });

        const response = await fetch(`${API_URL}/user/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        console.log("[Actualización] Respuesta del servidor:", {
            status: response.status,
            data
        });

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al actualizar los datos");
        }

        return data;
    } catch (error) {
        console.error("[Actualización] Error:", error);
        throw error;
    }
};

// -- Servicio Eliminar Usuario --
const deleteUser = async (id) => {
    try {
        console.log("[Eliminación] Enviando solicitud para eliminar usuario:", id);

        const response = await fetch(`${API_URL}/user/delete/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        console.log("[Eliminación] Respuesta del servidor:", {
            status: response.status,
            data
        });

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al eliminar la cuenta");
        }

        return data;

    } catch (error) {
        console.error("[Eliminación] Error:", error);
        throw error;
    }
};


export default {
    registerUser,
    loginUser,
    updateUser,
    deleteUser
};

