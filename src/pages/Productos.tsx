import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../types';
import axios from 'axios';
import ProductCard from '../components/cards/ProductCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/input';
import Card from '../components/ui/Card';

const Productos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'category'>('name');
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const useBackend = false;

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (useBackend) {
      axios.get<Product[]>('http://localhost:3000/src/productos')
        .then((res) => setProductos(res.data))
        .catch(() => setError('Error al conectar con el backend'))
        .finally(() => setLoading(false));
    } else {
      const productosMock = PRODUCTS.map((mock, idx) => ({
        id_producto: String(idx),
        nombre_producto: mock.TITULO,
        descripcion_producto: mock.DESCRIPCION,
        precio_producto: mock.PRECIO,
        imagen_producto: mock.FOTO,
        categoria_producto: mock.CATEGORIA,
        detalle_precio: mock.DETALLEPRECIO,
        opciones: mock.OPCIONES,
      }));
      setProductos(productosMock);
      setLoading(false);
    }
  }, [useBackend]);

  const categories = ['all', ...Array.from(new Set(productos.map(p => p.categoria_producto).filter(Boolean)))];

  const filteredProducts = productos.filter(product => {
    const matchesSearch = product.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.descripcion_producto?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.categoria_producto === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.nombre_producto.localeCompare(b.nombre_producto);
      case 'price-low':
        return a.precio_producto - b.precio_producto;
      case 'price-high':
        return b.precio_producto - a.precio_producto;
      case 'category':
        return a.categoria_producto.localeCompare(b.categoria_producto);
      default:
        return 0;
    }
  });

  const formatCategoryName = (category: string) => {
    if (category === 'all') return 'Todos';
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="min-h-screen bg-baby-light pt-20">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-r from-baby-blue/10 to-baby-pink/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-baby-pink" />
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-baby-gray mb-6">
              Nuestros <span className="text-baby-pink">Productos</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
              Descubre nuestra amplia selección de productos de alta calidad para el cuidado y bienestar de tu bebé. Cada artículo ha sido cuidadosamente seleccionado por nuestros expertos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Buscar productos"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent font-inter"
                aria-label="Filtrar por categoría"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {formatCategoryName(category)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent font-inter"
                aria-label="Ordenar productos"
              >
                <option value="name">Ordenar por nombre</option>
                <option value="price-low">Precio: menor a mayor</option>
                <option value="price-high">Precio: mayor a menor</option>
                <option value="category">Ordenar por categoría</option>
              </select>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-center lg:justify-end">
              <span className="text-gray-600 font-inter">
                {sortedProducts.length} producto{sortedProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="text-center py-16">Cargando productos...</div>
          )}
          {!loading && error && (
            <div className="text-center py-16 text-red-500">{error}</div>
          )}
          {!loading && !error && sortedProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <Card className="max-w-md mx-auto p-8">
                <Filter className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold font-poppins text-baby-gray mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600 font-inter mb-6">
                  Intenta ajustar tus filtros o términos de búsqueda
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('name');
                  }}
                  variant="outline"
                >
                  Limpiar filtros
                </Button>
              </Card>
            </motion.div>
          )}
          {!loading && !error && sortedProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id_producto}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                >
                  <ProductCard product={{
                    TITULO: product.nombre_producto,
                    DESCRIPCION: product.descripcion_producto,
                    OPCIONES: product.opciones ?? '',
                    PRECIO: product.precio_producto,
                    DETALLEPRECIO: product.detalle_precio ?? '',
                    FOTO: product.imagen_producto,
                    CATEGORIA: product.categoria_producto
                  }} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Productos;