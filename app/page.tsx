import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <section className="overflow-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Bem vindo!
        </h1>
        <p className="text-gray-700 text-lg mb-8 text-center">
          Esta é a minha App em React e Next.js, uma das tecnologias web mais usadas nos dias de hoje.
        </p>
        <nav className="flex flex-wrap justify-center gap-6">
          <Link href="/produtos" legacyBehavior>
            <a className="bg-purple-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-purple-600 transition">
              Produtos
            </a>
          </Link>
          <Link href="/tecnologias" legacyBehavior>
            <a className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition">
              Tecnologias
            </a>
          </Link>
          <Link href="/Municipalities" legacyBehavior>
            <a className="bg-yellow-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600 transition">
              Municipalities
            </a>
          </Link>
        </nav>
      </section>
    </main>
  );
}
