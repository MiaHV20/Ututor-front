import "../Styles/Services.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMaterias } from "../../api";

const Services = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowLeftArrow(scrollRef.current.scrollLeft > 10);
      }
    };

    const ref = scrollRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);

    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --- Cargar materias (función reusable) ---
  const cargarMaterias = (query = "") => {
    getMaterias(query ? { q: query } : {})
      .then((data) => {
        setMaterias(data.materias || []);
      })
      .catch((err) => console.error("Error cargando materias:", err));
  };

  // --- Cargar materias al inicio ---
  useEffect(() => {
    cargarMaterias();
  }, []);

  // --- Buscar materias con debounce ---
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      cargarMaterias(searchTerm);
    }, 300); // Esperar 300ms antes de buscar

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <section className="services-section bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg">
      <div className="services-header text-white mb-6">
        <h2 className="text-3xl font-bold">
          Nuestros mejores cursos <br /> Disponibles para ti
        </h2>
        <div className="services-description mt-2">
          <h4 className="text-xl font-semibold">¡Explora y aprende!</h4>
          <p>
            Descubre nuestros cursos más destacados para potenciar tus conocimientos y habilidades.
          </p>
        </div>

        {/* === Barra de búsqueda === */}
        <div className="search-container mt-4">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Carrusel */}
      <div className="carousel-container">
        <div className="cards-scroll" ref={scrollRef}>
          {materias.length > 0 ? (
            materias.map((materia) => (
              <div key={materia.id} className="service-card">
                <img src="/assets/default-course.jpg" alt={materia.nombre} />
                <h3>{materia.nombre}</h3>
                <p>{materia.descripcion}</p>
                <Link to={`/materias/${materia.id}`} className="service-button">
                  Reservar
                  <span className="arrow-svg" />
                </Link>
              </div>
            ))
          ) : (
            <p className="text-white">No se encontraron cursos.</p>
          )}
        </div>

        {showLeftArrow && (
          <button className="carousel-arrow left" onClick={scrollLeft}>
            <svg
              className="carousel-icon left"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        )}

        <button className="carousel-arrow right" onClick={scrollRight}>
          <svg
            className="carousel-icon right"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Services;