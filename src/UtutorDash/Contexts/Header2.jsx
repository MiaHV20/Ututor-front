import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header2({ minimal = false, username: propUsername }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    setUsername(propUsername || storedName || "Usuario");
  }, [propUsername]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div
      className={`bg-white py-3 px-4 sm:px-8 max-w-screen-4xl mx-auto ${
        minimal
          ? "flex flex-col items-center justify-center text-center"
          : "flex justify-between items-center"
      }`}
    >
      <div
        className={`flex items-center gap-2 ${
          minimal ? "flex-col text-center" : ""
        }`}
      >
        <div className="leading-tight">
          <h1 className="text-xl text-blue-600 sm:text-3xl font-bold">
            UTutor
          </h1>
          <p className="text-lg text-gray-900">Sistema de Tutorías Académicas</p>
        </div>
      </div>

      {!minimal && (
        <div className="flex items-center space-x-4">
          <button className="p-2 border border-blue-400 bg-white text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-blue-600 text-lg">👤 {username}</span>
          </div>

          <button
            className="border border-blue-400 bg-white text-blue-400 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default Header2;