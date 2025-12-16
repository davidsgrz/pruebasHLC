import React from 'react';

interface Card {
  nombre: string;
  imagen: string;
  dato: string | number;
  etiqueta: string;
}

export const Card: React.FC<Card> = ({ nombre, imagen, dato, etiqueta }) => {
  return (
    <div className="card">
      <img src={imagen} alt={nombre} className="card-img" />
      <h3>{nombre}</h3>
      <p>
        <strong>{etiqueta}:</strong> {dato}
      </p>
    </div>
  );
};
