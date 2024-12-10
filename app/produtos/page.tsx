import React from 'react';
import useSWR from 'swr';
import { Product } from '@/models/interfaces'; 
import Card from '@/components/Card/Card'; 

// Função fetcher para obter os dados da API
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Page() {
  // Usando o hook useSWR para buscar os produtos
  const { data, error } = useSWR<Product[]>('/api/products', fetcher);

  // Verifica se os dados ainda estão sendo carregados
  if (!data) return <div>A carregar produtos</div>;
  
  // Verifica se houve algum erro ao carregar os produtos
  if (error) return <div>Erro ao carregar produtos</div>;

  return (
    <main>
      <h1>Produtos Disponíveis</h1>
      <div className="product-grid">
        {/* Mapeando os produtos para renderizar os Cards */}
        {data.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

