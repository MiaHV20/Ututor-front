import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from "../UtutorHome/Contexts/Header";
import { listUsers } from "../api";

export default function Login({ minimal = false }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const usuarios = await listUsers();

      const usuario = usuarios.find(
        u => u.email === email && u.password === password
      );

      if (usuario) {
        localStorage.setItem("user", JSON.stringify(usuario));
        navigate("/dashboard");
      } else {
        setError("Correo o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <>
      <Header minimal />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-100 overflow-hidden px-4">
        <div className="bg-white p-10 shadow-md w-full max-w-md rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión en UTutor</h2>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition-all rounded-md"
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition-all rounded-md"
                placeholder="Contraseña"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-600 text-white font-semibold py-4 transition-colors rounded-md"
            >
              Iniciar Sesión
            </button>

            <p className="text-center mt-6 text-sm text-blue-600">
              ---------- ¿Todavía no tienes una cuenta UTutor? ----------
            </p>

            {!minimal && (
              <div className="flex justify-center mt-3">
                <Link
                  to="/register"
                  type="button"
                  className="bg-emerald-400 hover:bg-emerald-600 text-white font-semibold px-5 py-2 rounded-md transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}