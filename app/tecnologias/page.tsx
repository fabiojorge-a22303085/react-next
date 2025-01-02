import React from 'react';
import tecnologias from '../data/tecnologias.json';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Tecnologias</h1>
      {/* Layout em coluna */}
      <div className="flex flex-col gap-8">
        {tecnologias.map((tecnologia) => (
          <div
            key={tecnologia.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            <Image
              src={tecnologia.image}
              alt={tecnologia.title}
              width={100}
              height={100}
              className="flex-shrink-0"
            />
            <div className="flex flex-col text-center sm:text-left">
              <h2 className="text-xl font-semibold mb-2">{tecnologia.title}</h2>
              <p className="text-gray-600 mb-4">{tecnologia.description}</p>
              <p className="text-gray-700 font-bold">Rating: {tecnologia.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
