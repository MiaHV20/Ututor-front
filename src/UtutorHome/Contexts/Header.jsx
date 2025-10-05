import { Link } from "react-router-dom";

function Header({ minimal = false }) {
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
          <h1 className="text-xl text-blue-600 sm:text-3xl font-bold">UTutor</h1>
          <p className="text-lg text-gray-900">Sistema de Tutorías Académicas</p>
        </div>
      </div>

      {!minimal && (
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="border border-blue-400 bg-white text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-4 py-2 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="border border-blue-400 bg-blue-400 text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 px-4 py-2 rounded-lg transition-colors"
          >
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;