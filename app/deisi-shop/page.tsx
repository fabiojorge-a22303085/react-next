"use client";

import React from 'react'
import { useEffect, useState } from 'react';
import { Product } from '@/models/interfaces';
import Card from '@/components/Card/Card';

export default function DeisiShopPage() {
  const [products, setProducts] = useState<Product[]>([]); // Lista de produtos
  const [cart, setCart] = useState<Product[]>([]); // Produtos no carrinho
  const [search, setSearch] = useState(""); // Valor da pesquisa

  // Fetch produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://deisishop.pythonanywhere.com/products/");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Carregar carrinho do localStorage ao montar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Salvar carrinho no localStorage sempre que ele for atualizado
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Adicionar ao carrinho
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remover um produto específico do carrinho
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  // Limpar o carrinho
  const clearCart = () => {
    setCart([]);
  };

  // Comprar produtos
  const buy = () => {
    fetch("/api/deisishop/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map((product) => product.id), // Mapear IDs dos produtos no carrinho
        name: "", // Atualize o nome conforme necessário
        student: false, // Atualize o status de estudante conforme o contexto
        coupon: "", // Adicione um cupom, se necessário
      }),
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText); // Lança erro se a resposta não for OK
        }
        return response.json(); // Converte a resposta para JSON
      })
      .then((data) => {
        console.log("Compra realizada com sucesso:", data);
        setCart([]); // Limpa o carrinho após a compra
      })
      .catch((error) => {
        console.error("Erro ao comprar:", error.message); // Exibe erro no console
        alert("Erro ao processar a compra. Por favor, tente novamente."); // Alerta ao usuário
      });
  };
  



  return (
    <main className="h-full w-full bg-gray-50 flex flex-col">
      {/* Cabeçalho */}
      <header className="w-full bg-gray-100 shadow-md py-4">
        <h1 className="text-4xl font-bold text-center">DEISI Shop</h1>
      </header>

      {/* Campo de Pesquisa */}
      <section className="p-6">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      {/* Lista de Produtos */}
      <section className="flex flex-wrap justify-center gap-6 p-6">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              rating={product.rating} // Passa o rating como prop
              onAddToCart={() => addToCart(product)}
            />
          ))}
      </section>

      {/* Carrinho */}
      <section className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Carrinho</h2>
        {cart.length > 0 ? (
          <>
            {/* Produtos no Carrinho */}
            {cart.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 mb-4"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold">{product.title}</p>
                  <p className="text-sm text-gray-500">€{product.price.toFixed(2)}</p>
                </div>
                {/* Botão de Remover */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            ))}

            {/* Botões Comprar e Limpar */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={buy}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Comprar
              </button>
              <button
                onClick={clearCart}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Limpar Carrinho
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        )}
      </section>
    </main>
  );
}
