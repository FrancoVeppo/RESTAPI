import React from 'react';
import '../styles/components/pages/HomePage.css';

const HomePage = (props) => {
  return (
    <main className="holder">
      <div className="homeimg">
        <img src="/images/home/fondo.png" alt="Gaming Setup" />
      </div>
      <div className="columnas">
        
        {/* --- SECCIÓN "BIENVENIDOS" (ÚLTIMOS LANZAMIENTOS) --- */}
        <div className="bienvenidos">
          <h2>Últimos Lanzamientos</h2>
          <p>
            Descubre el hardware más potente para llevar tu juego al siguiente nivel. Tarjetas gráficas, procesadores y periféricos de alta gama.
          </p>
          {/* --- TEXTO AÑADIDO --- */}
          <p>
            Explora nuestra selección de las nuevas GPUs RTX serie 40, los procesadores Ryzen 7000 y los SSD NVMe más rápidos del mercado. No importa si eres un jugador casual o un profesional de eSports, tenemos el equipo que necesitas para dominar.
          </p>
        </div>

        {/* --- SECCIÓN "TESTIMONIOS" (REVIEWS DE CLIENTES) --- */}
        <div className="testimonios">
          <h2>Reviews de Clientes</h2>
          
          <div className="testimonio">
            <span className="cita">¡Los mejores precios y envío rápido!</span>
            <span className="autor">GamerPro88</span>
          </div>
          
          {/* --- REVIEW AÑADIDA --- */}
          <div className="testimonio">
            <span className="cita">Excelente atención al cliente. Me ayudaron a elegir mi setup completo y estoy maravillado.</span>
            <span className="autor">LucianaG</span>
          </div>

          {/* --- REVIEW AÑADIDA --- */}
          <div className="testimonio">
            <span className="cita">La PC armada llegó impecable, lista para usar. 100% recomendado.</span>
            <span className="autor">JulioSilva_OK</span>
          </div>

        </div>
      </div>
    </main>
  );
}

export default HomePage;