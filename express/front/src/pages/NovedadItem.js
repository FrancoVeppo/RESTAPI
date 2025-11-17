import React from 'react'; // Esta línea faltaba en la imagen

const NovedadItem = (props) => {
  // Usamos destructuring para sacar las propiedades [cite: 396]
  const { title, subtitle, imagen, body } = props;

  return (
    <div className="novedades"> {/* [cite: 398] */}
      <h1>{title}</h1> {/* [cite: 399] */}
      <h2>{subtitle}</h2> {/* [cite: 400] */}
      <img src={imagen} alt={title} /> {/* [cite: 401] */}

      {/* Esta línea es especial: renderiza el HTML del backend [cite: 402] */}
      <div dangerouslySetInnerHTML={{ __html: body }} />
      
      <hr /> {/* [cite: 402] */}
    </div>
  );
}

export default NovedadItem; // [cite: 406]