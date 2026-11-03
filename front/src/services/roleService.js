// const API_URL = "http://localhost:4000";

// const getRoles = async () => {
//     try {
//         const response = await fetch(`${API_URL}/role`);

//         if (!response.ok) {
//             throw new Error("Error al consultar los roles");
//         }

//         const data = await response.json();

//         return data.roles;

//     } catch (error) {
//         console.error("Error al consumir la API de roles:", error);
//         throw error;
//     }
// };

// export default {
//     getRoles
// };


const API_URL = "http://localhost:4000";

const getRoles = async () => {
    try {
        const response = await fetch(`${API_URL}/role/list`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        return data.roles;

    } catch (error) {
        console.error("Error al consultar los roles:", error);
        throw error;
    }
};

export default {
    getRoles
};
