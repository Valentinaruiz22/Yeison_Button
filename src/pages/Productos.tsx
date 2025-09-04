import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../types';
import ProductCard from '../components/cards/ProductCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/input';
import Card from '../components/ui/Card';
import LinkButton from '../components/ui/LinkButton';

const Productos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'category'>('name');

  // Mapear productos a un formato uniforme para el componente
  const mappedProducts: (Product & {
    id: number;
    name: string;
    description?: string;
    price: number;
    category: string;
    image: string;
  })[] = PRODUCTS.map((p, index) => ({
    ...p,
    id: index,
    name: p.TITULO,
    description: p.DESCRIPCION,
    price: p.PRECIO,
    category: p.CATEGORIA,
    image: p.FOTO,
  }));

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(mappedProducts.map(p => p.category).filter(Boolean))
    ) as string[];
    return ['all', ...uniqueCategories];
  }, [mappedProducts]);

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mappedProducts.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, mappedProducts]);

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
                {filteredAndSortedProducts.length} producto{filteredAndSortedProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredAndSortedProducts.length === 0 ? (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Highlights */}
      {selectedCategory === 'all' && searchTerm === '' && (
        <section className="py-16 px-4 bg-baby-light">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-baby-gray mb-4">
                Explora por <span className="text-baby-pink">Categoría</span>
              </h2>
              <p className="text-lg text-gray-600 font-inter">
                Encuentra exactamente lo que necesitas para tu bebé
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.slice(1).map((category, index) => {
                const categoryCount = mappedProducts.filter(p => p.category === category).length;
                return (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className="group"
                  >
                    <Card className="p-6 h-full border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-baby-purple/20 group-hover:to-baby-pink/20">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-baby-purple to-baby-pink rounded-full flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold font-poppins text-baby-gray mb-1">
                          {formatCategoryName(category)}
                        </h3>
                        <p className="text-sm text-gray-500 font-inter">
                          {categoryCount} producto{categoryCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </Card>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-baby-mint/20 to-baby-blue/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-baby-gray mb-6">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-inter">
              Contáctanos y te ayudaremos a encontrar el producto perfecto para tu bebé
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkButton
                href="/contacto"
                size="lg"
                className="bg-gradient-to-r from-baby-blue to-baby-pink text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contáctanos
              </LinkButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Productos;