// components/ProductCard/ProductCard.tsx
import React from 'react';
import { Product } from '@/models/interfaces';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md hover:translate-y-[-5px] transition-transform">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-auto rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
      <p className="text-sm text-gray-600">Categoria: {product.category}</p>
      <p className="text-xl font-bold text-black mt-2">{product.price.toFixed(2)} €</p>
      <button className="bg-purple-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-purple-500 transition-colors">
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductCard;
