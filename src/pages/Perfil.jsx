import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../UtutorHome/Contexts/Header";
import { getUser, updateUser } from "../api";

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await getUser(userId);
        setUser(data);
        setNombre(data.nombre);
        setApellido(data.apellido);
        setBio(data.bio || "");
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información del usuario");
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const updated = await updateUser(userId, { nombre, apellido, bio });
      setUser(updated);
      setSuccess("Perfil actualizado correctamente 🎉");
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el perfil");
    }
  };

  if (!user) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-100 overflow-hidden px-4">
        <div className="bg-white p-10 shadow-md w-full max-w-md rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Mi Perfil</h2>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
              {success}
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
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </>
  );
}