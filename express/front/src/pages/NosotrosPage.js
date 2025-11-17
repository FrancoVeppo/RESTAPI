import React from 'react';
// (Importa el CSS corregido)
import '../styles/components/pages/NosotrosPage.css';

const NosotrosPage = (props) => {
  return (
    <main className="holder">

      {/* --- SECCIÓN DE HISTORIA --- */}
      <div className="historia">
        <h2>Nuestra Historia</h2>
        <p>
          Fundada en 2020 por un grupo de entusiastas del PC gaming, <strong>Gaming Store</strong> nació 
          de una idea simple: crear un lugar donde cada jugador, desde el principiante hasta el 
          profesional de eSports, pudiera encontrar el hardware perfecto sin complicaciones.
        </p>
        <p>
          Empezamos en un pequeño local y, gracias al apoyo de la comunidad, crecimos hasta 
          convertirnos en la tienda de referencia para hardware de alto rendimiento. 
          Nuestra misión no es solo vender componentes, sino asesorar y construir las 
          mejores PCs personalizadas del mercado.
        </p>
      </div>

      {/* --- SECCIÓN DE STAFF --- */}
      <div className="staff">
        <h2>Nuestro Equipo</h2>
        <div className="personas">

          <div className="persona">
            {/* CORRECCIÓN: La ruta correcta es /images/... */}
            <img src="/images/nosotros/nosotros.png" alt="Franco Veppo" />
            <h5>Franco Veppo</h5>
            <h6>CEO y Fundador</h6>
            <p>
              Experto en hardware y ensamblaje. Franco lidera la visión de la empresa, 
              asegurando que solo tengamos lo mejor de lo mejor en nuestro catálogo.
            </p>
          </div>

          <div className="persona">
            {/* CORRECCIÓN: Usamos la imagen que existe */}
            <img src="/images/nosotros/nosotros.png" alt="Thiago Romero" />
            <h5>Thiago Romero</h5>
            <h6>Especialista en Periféricos</h6>
            <p>
              Thiago es nuestro gurú de los periféricos. Si buscas el mouse, teclado 
              o monitor perfecto para tu setup, él es tu hombre.
            </p>
          </div>

          <div className="persona">
            {/* CORRECCIÓN: Usamos la imagen que existe */}
            <img src="/images/nosotros/nosotros.png" alt="Julio Silva" />
            <h5>Julio Silva</h5>
            <h6>Soporte y Logística</h6>
            <p>
              Julio se encarga de que tu pedido llegue rápido y seguro. Es el corazón 
              de nuestra operación logística y atención al cliente.
            </p>
          </div>

        </div>
      </div>
      
    </main>
  );
}

export default NosotrosPage;