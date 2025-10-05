import "../Styles/Services.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Cloud Computing",
    image: "/assets/cloud-computing.jpg",
    button: true,
  },
  {
    title: "Desarrollo basado en plataformas",
    image: "/assets/desarrollo.jpg",
    button: true,
  },
  {
    title: "Estadística I",
    image: "/assets/estadistica.jpg",
    button: true,
  },
  {
    title: "Programación III",
    image: "/assets/programacion.jpg",
    button: true,
  },
  {
    title: "Ecuaciones Diferenciales",
    image: "/assets/ecuaciones.jpg",
    button: true,
  },
];

const Services = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

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

  return (
    <section className="services-section bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg">
      <div className="services-header text-white mb-6">
        <h2 className="text-3xl font-bold">
          Nuestros mejores cursos <br/> Disponibles para ti
        </h2>
        <div className="services-description mt-2">
          <h4 className="text-xl font-semibold">¡Explora y aprende!</h4>
          <p>
            Descubre nuestros cursos más destacados para potenciar tus
            conocimientos y habilidades.
          </p>
        </div>
      </div>

      <div className="carousel-container">
        <div className="cards-scroll" ref={scrollRef}>
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <img src={service.image} alt={service.title} />
              <h3>{service.title}</h3>
              {service.button ? (
                <Link to="/login" className="service-button">
                  Reserva
                  <span className="arrow-svg" />
                </Link>
              ) : (
                <div className="arrow-button">→</div>
              )}
            </div>
          ))}
        </div>

        {showLeftArrow && (
          <button className="carousel-arrow left" onClick={scrollLeft}>
            <svg className="carousel-icon left" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        )}

        <button className="carousel-arrow right" onClick={scrollRight}>
          <svg className="carousel-icon right" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>

      </div>
    </section>
  );
};

export default Services;