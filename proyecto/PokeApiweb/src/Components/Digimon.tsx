import React, { useState, useEffect } from 'react';
import { Card } from './cardpkd';
import { Error } from './Errores';

interface Digimon {
  nombre: string;
  imagen: string;
  nivel: string;
}

export const Digimon: React.FC = () => {
  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const obtenerDigimons = async () => {
      setCargando(true);
      setError(false);
      try {
        const response = await fetch('https://digimon-api.vercel.app/api/digimon');
        if (!response.ok) {
          throw Error;
        }
        const data: any[] = await response.json();

        const seleccion: Digimon[] = [];
        // 10 digimon aleatorios
        for (let i = 0; i < 10; i++) {
          const randomIdx = Math.floor(Math.random() * data.length);
          const d = data[randomIdx];

          seleccion.push({
            nombre: d.name,
            imagen: d.img,
            nivel: d.level,
          });
        }

        setDigimons(seleccion);
      } catch (e) {
        console.error('Algo salió mal:', e);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    obtenerDigimons();
  }, []);

  if (cargando) return <h2 className="mensaje">Abriendo Digital World...</h2>;
  if (error) return <Error />;

  return (
    <div className="grid-container">
      {digimons.map((d, index) => (
        <Card
          key={index}
          nombre={d.nombre}
          imagen={d.imagen}
          dato={d.nivel}
          etiqueta="Nivel"
        />
      ))}
    </div>
  );
};
