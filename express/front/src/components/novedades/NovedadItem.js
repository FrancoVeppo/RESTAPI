import React from 'react';
// (Opcional: puedes importar un CSS específico para el item si lo tienes)
// import '../../styles/components/novedades/NovedadItem.css'; 

const NovedadItem = (props) => {
  const { title, subtitle, imagen, body } = props;

  return (
    <div className="novedades">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <img src={imagen} alt={title} />
      {/* Esta línea renderiza el HTML que viene del backend [cite: 402, 408-409] */}
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <hr />
    </div>
  );
}

export default NovedadItem;