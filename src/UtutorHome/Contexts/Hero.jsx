import "../Styles/Hero.css";
import { Link } from "react-router-dom";

function Hero({ minimal = false }) {
  return (
    <section className="hero">
      <div className="hero-content">

        <p className="hero-subtitle">Las mejores tutorías con los mejores tutores.</p>

        <h1 className="hero-title">
          ¡Aprende <br /> con los <br /> mejores!
        </h1>

        <p className="hero-description">
           Te ayudamos a conseguir las mejores calificaciones
        </p>

        {!minimal && (
          <Link
            to="/login"
            className="hero-button border border-blue-400 bg-blue-400 text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 px-4 py-2 rounded-lg transition-colors"
          >
            Estudia ahora
          </Link>
        )}

      </div>
    </section>
  );
}

export default Hero;
