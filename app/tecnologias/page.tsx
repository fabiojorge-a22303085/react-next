import React from 'react';
import tecnologias from '../data/tecnologias.json'

import Image from 'next/image';

export default function TecnologiasPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Tecnologias</h1>
      <div className="flex flex-col gap-8">
        {tecnologias.map((tecnologia) => (
          <div
            key={tecnologia.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
          >
            <Image
              src={tecnologia.image} // Caminho da imagem vindo do JSON
              alt={tecnologia.title}
              width={100} // Largura fixa
              height={100} // Altura fixa
              className="mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{tecnologia.title}</h2>
            <p className="text-gray-600 mb-4">{tecnologia.description}</p>
            <p className="text-gray-700 font-bold">Rating: {tecnologia.rating}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
