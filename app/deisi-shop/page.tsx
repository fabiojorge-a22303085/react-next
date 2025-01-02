"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function DeisiShopPage() {
  const [products, setProducts] = useState<Product[]>([]); // Todos os produtos
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Produtos filtrados
  const [search, setSearch] = useState(""); // Valor da pesquisa
  const [cart, setCart] = useState<Product[]>([]); // Produtos no carrinho

  // Fetch produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://deisishop.pythonanywhere.com/products/");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Inicialmente, todos os produtos são exibidos
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Atualizar o localStorage sempre que o carrinho for atualizado
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Filtrar produtos com base na pesquisa
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  // Adicionar produto ao carrinho
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remover produto do carrinho
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
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
        products: cart.map((product) => product.id), 
        name: "", 
        student: false, 
        coupon: "", 
      }),
      headers: {
        "Content-Type": "application/json", 
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText); 
        }
        return response.json();
      })
      .then((data) => {
        console.log("Compra realizada com sucesso:", data);
        setCart([]); // Limpa o carrinho após a compra
      })
      .catch((error) => {
        console.error("Erro ao comprar:", error.message); 
        alert("Erro ao processar a compra. Por favor, tente novamente."); 
      });
  };
  
  


  return (
    <main className="h-full w-full bg-white flex flex-col">
      {/* Cabeçalho */}
      <header className="w-full bg-gray-100 shadow-md py-4">
        <h1 className="text-4xl font-bold text-center border-b-4 border-black">
          DEISI Shop
        </h1>
      </header>

      {/* Campo de Pesquisa */}
      <section className="p-6 bg-gray-50">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      {/* Lista de Produtos */}
      <section className="flex flex-wrap justify-center items-center gap-6 p-6 mx-auto">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center w-72"
          >
            {/* Imagem */}
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className="mb-4 rounded-md object-cover"
            />
            {/* Título */}
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            {/* Descrição */}
            <p className="text-gray-600 mb-4">{product.description}</p>
            {/* Preço */}
            <p className="text-gray-800 font-bold mb-2">€{product.price.toFixed(2)}</p>
            {/* Botão Adicionar ao Carrinho */}
            <button
              onClick={() => addToCart(product)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </section>

      {/* Carrinho */}
      <section className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Carrinho</h2>
        {cart.length > 0 ? (
          <>
            {cart.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 mb-4"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold">{product.title}</p>
                  <p className="text-sm text-gray-500">€{product.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            ))}

            {/* Botões do Carrinho */}
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

      <footer className="w-full bg-gray-100 py-4 flex justify-center">
      </footer>
    </main>
  );
}
