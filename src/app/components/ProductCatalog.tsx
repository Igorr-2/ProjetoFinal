import { useState } from 'react';
import type { Product } from '../App';

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Salgado Assado',
    description: 'Coxinha, esfiha ou risoles assados',
    price: 4.50,
    category: 'Salgados',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400',
    available: true,
    stock: 25
  },
  {
    id: '2',
    name: 'Salgado Frito',
    description: 'Coxinha, pastel ou bolinha de queijo',
    price: 5.00,
    category: 'Salgados',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    available: true,
    stock: 30
  },
  {
    id: '3',
    name: 'Hambúrguer',
    description: 'Hambúrguer artesanal com queijo',
    price: 12.00,
    category: 'Lanches',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    available: true,
    stock: 15
  },
  {
    id: '4',
    name: 'Hot Dog',
    description: 'Hot dog completo com batata palha',
    price: 8.00,
    category: 'Lanches',
    image: 'https://images.unsplash.com/photo-1612392062798-2510c7b11573?w=400',
    available: true,
    stock: 20
  },
  {
    id: '5',
    name: 'Sanduíche Natural',
    description: 'Pão integral com peito de peru e queijo',
    price: 7.50,
    category: 'Lanches',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400',
    available: true,
    stock: 18
  },
  {
    id: '6',
    name: 'Suco Natural',
    description: 'Laranja, limão ou morango - 300ml',
    price: 5.50,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    available: true,
    stock: 40
  },
  {
    id: '7',
    name: 'Refrigerante Lata',
    description: 'Coca-Cola, Guaraná ou Fanta - 350ml',
    price: 4.00,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
    available: true,
    stock: 50
  },
  {
    id: '8',
    name: 'Água Mineral',
    description: 'Água mineral sem gás - 500ml',
    price: 2.50,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    available: true,
    stock: 60
  },
  {
    id: '9',
    name: 'Açaí no Copo',
    description: 'Açaí com banana e granola - 300ml',
    price: 10.00,
    category: 'Sobremesas',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
    available: true,
    stock: 12
  },
  {
    id: '10',
    name: 'Brownie',
    description: 'Brownie de chocolate com nozes',
    price: 6.00,
    category: 'Sobremesas',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
    available: true,
    stock: 22
  },
  {
    id: '11',
    name: 'Sorvete',
    description: 'Picolé de frutas variadas',
    price: 3.50,
    category: 'Sobremesas',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
    available: true,
    stock: 35
  },
  {
    id: '12',
    name: 'Salada de Frutas',
    description: 'Mix de frutas frescas - 250g',
    price: 8.00,
    category: 'Sobremesas',
    image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400',
    available: true,
    stock: 10
  }
];

const CATEGORIES = ['Todos', 'Salgados', 'Lanches', 'Bebidas', 'Sobremesas'];

export function ProductCatalog({ onAddToCart }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && product.available && product.stock > 0;
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cardápio da Cantina</h2>
        <p className="text-gray-600">Escolha seus produtos favoritos e adicione ao carrinho</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500">Nenhum produto encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-medium ${product.stock < 10 ? 'text-orange-600' : 'text-gray-500'}`}>
                    {product.stock > 0 ? `${product.stock} disponíveis` : 'Esgotado'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                      product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {product.stock === 0 ? 'Esgotado' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}