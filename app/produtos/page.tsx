import React from 'react'

import useSWR from 'swr';
import {Product} from '@/models/interfaces'; 
// import ProductCard from '@/components/ProductCard/ProductCard'; 

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Page() {
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  if (isLoading) return <div>Carregando produtos...</div>;
  if (error) return <div>Erro ao carregar os produtos!</div>;

  return (
    <main>
      <h1>Produtos</h1>
     
    </main>
  );
}

