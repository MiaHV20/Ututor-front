import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from "../UtutorHome/Contexts/Header";

import { registerUser } from '../api';

export default function Register({ minimal = false }) {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      nombre,
      apellido,
      email,
      password,
      bio
    };

    try {
      const response = await registerUser(payload);
      if (response.message) {
        localStorage.setItem("username", `${nombre} ${apellido}`);
        localStorage.setItem("userId", response.id); 
        alert("Registro exitoso 🎉");
        navigate("/dashboard");
      } else {
        setError("Error en el registro. Intenta nuevamente.");
      }
    } catch (err) {
      console.error(err);
      setError(err.detail || "Error inesperado en el servidor.");
    }
  };

  return (
    <>
      <Header minimal />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-100 overflow-hidden px-4">
        <div className="bg-white p-10 shadow-md w-full max-w-md rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Registrarse en UTutor</h2>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition-all rounded-md"
                placeholder="Nombre"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition-all rounded-md"
                placeholder="Apellido"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition-all rounded-md"
                placeholder="Correo electrónico"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition-all rounded-md"
                placeholder="Contraseña"
                required
              />
            </div>

            <div className="mb-6">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition-all rounded-md"
                placeholder="Bio (opcional)"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-600 text-white font-semibold py-4 transition-colors rounded-md"
            >
              Registrarse
            </button>

            <p className="text-center mt-6 text-sm text-blue-600">
              ---------- ¿Ya tienes una cuenta UTutor? ----------
            </p>

            {!minimal && (
              <div className="flex justify-center mt-3">
                <Link
                  to="/login"
                  className="bg-emerald-400 hover:bg-emerald-600 text-white font-semibold px-5 py-2 rounded-md transition-colors"
                >
                  Inicia sesión
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
