import React, { useState, useEffect } from 'react';
import { Card } from './cardpkd';
import { Error } from './Errores';

export interface Pokemon {
  id: number;
  nombre: string;
  imagen: string;
  dato: string | number;
  etiqueta: string;
}

export const CardPokemon: React.FC<{ min: number; max: number }> = ({ min, max }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const obtenerPokemons = async () => {
      setCargando(true);
      setError(false);
      try {
        const request: Promise<any>[] = [];
        const idsGenerados = new Set<number>();

        // 10 IDs aleatorios SIN repetir
        while (idsGenerados.size < 10) {
          const id = Math.floor(Math.random() * (max - min + 1)) + min;
          if (!idsGenerados.has(id)) {
            idsGenerados.add(id);
            request.push(
              fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
            );
          }
        }

        const result = await Promise.all(request);

        const dataLimpia: Pokemon[] = result.map((data: Record<string, any>) => ({
          id: data.id,
          nombre: data.name,
          imagen: data.sprites.other['official-artwork'].front_default,
          dato: data.stats[0].base_stat,
          etiqueta: 'HP',
        }));

        setPokemons(dataLimpia);
      } catch (err) {
        console.error('Algo salió mal:', err);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    obtenerPokemons();
  }, [min, max]);

  if (cargando) return <h2 className="mensaje">Cargando...</h2>;
  if (error) return <Error />;

  return (
    <div className="grid-container">
      {pokemons.map((p) => (
        <Card
          key={p.id}
          nombre={p.nombre}
          imagen={p.imagen}
          dato={p.dato}
          etiqueta={p.etiqueta}
        />
      ))}
    </div>
  );
};
