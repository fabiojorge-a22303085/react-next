import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card'; // Certifique-se de que o caminho para Card está correto

interface Tecnologia {
  id: number;
  title: string;
  image: string;
  description: string;
  rating: number;
}

const TecnologiasPage = () => {
  const [tecnologias, setTecnologias] = useState<Tecnologia[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTecnologias = async () => {
      try {
        const response = await fetch('/data/tecnologias.json'); // O caminho pode variar dependendo da sua estrutura
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
    <main className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Tecnologias que Aprendi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tecnologias.map((tecnologia) => (
          <Card
            key={tecnologia.id}
            title={tecnologia.title}
            image={tecnologia.image}
            description={tecnologia.description}
            rating={tecnologia.rating}
          />
        ))}
      </div>
    </main>
  );
};

export default TecnologiasPage;
