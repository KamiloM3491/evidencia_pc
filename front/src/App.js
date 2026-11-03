// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;






// // import React, { useEffect, useState } from 'react';
// // import './App.css';
// // import roleService from './services/roleService';

// // function App() {
// //     const [roles, setRoles] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const loadRoles = async () => {
// //             try {
// //                 const data = await roleService.getRoles();
// //                 setRoles(data);
// //             } catch (error) {
// //                 setError('No fue posible consultar los roles');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         loadRoles();
// //     }, []);

// //     return (
// //         <div className="App">
// //             <header className="App-header">
// //                 <h1>Pequeñas Criaturas</h1>
// //                 <h2>Roles registrados</h2>

// //                 {loading && <p>Cargando roles...</p>}

// //                 {error && <p>Error: {error}</p>}

// //                 {!loading && !error && (
// //                     roles.length > 0 ? (
// //                         <ul>
// //                             {roles.map((role) => (
// //                                 <li key={role._id}>
// //                                     {role.nombreRol}
// //                                 </li>
// //                             ))}
// //                         </ul>
// //                     ) : (
// //                         <p>No hay roles registrados.</p>
// //                     )
// //                 )}
// //             </header>
// //         </div>
// //     );
// // }

// // export default App;






// // // import React from 'react';
// // // import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // // import Navbar from './components/Navbar';
// // // import Footer from './components/Footer';

// // // import Home from './pages/Home';
// // // import Register from './pages/Register';
// // // import Login from './pages/Login';
// // // import UserProfile from './pages/UserProfile';
// // // import UpdateProfile from './pages/UpdateProfile';

// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <BrowserRouter>
// // //       <div className="App">

// // //         <Navbar />

// // //         <main>
// // //           <Routes>
// // //             <Route path="/" element={<Home />} />
// // //             <Route path="/login" element={<Login />} />
// // //             <Route path="/registro" element={<Register />} />
// // //             <Route path="/perfil" element={<UserProfile />} />
// // //             <Route path="/perfil/actualizar" element={<UpdateProfile />} />
// // //           </Routes>
// // //         </main>

// // //         <Footer />

// // //       </div>
// // //     </BrowserRouter>
// // //   );
// // // }

// // // export default App;





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


