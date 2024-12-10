import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card'; // Certifique-se de que o caminho do Card está correto
import { Tecnologia } from '@/models/interfaces'; // Importe a interface Tecnologia

const TecnologiasPage = () => {
  const [tecnologias, setTecnologias] = useState<Tecnologia[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Carregar dados do arquivo JSON
    const fetchTecnologias = async () => {
      try {
        const response = await fetch('/data/tecnologias.json');
        const data = await response.json();
        setTecnologias(data);
      } catch (err) {
        setError('Erro ao carregar as tecnologias.');
      }
    };

    fetchTecnologias();
  }, []);

  if (error) return <div>{error}</div>;
  if (!tecnologias.length) return <div>Carregando tecnologias...</div>;

  return (
    <main>
      <h1>Tecnologias Disponíveis</h1>
      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tecnologias.map((tecnologia) => (
          <div key={tecnologia.id} className="card p-4 border rounded-lg shadow-md">
            <img
              src={tecnologia.image}
              alt={tecnologia.title}
              className="w-full h-32 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold">{tecnologia.title}</h3>
            <p className="text-gray-600">{tecnologia.description}</p>
            <p className="text-yellow-500">Rating: {tecnologia.rating} / 5</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TecnologiasPage;

