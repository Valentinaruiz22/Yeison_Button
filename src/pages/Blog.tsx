import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Tag, Search, TrendingUp } from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import BlogCard from '../components/cards/BlogCard';
import Input from '../components/ui/input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(BLOG_POSTS.map((post) => post.category)));
    return ['all', ...uniqueCategories];
  }, []);

  // Filtrar posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Posts destacados (los más recientes)
  const featuredPosts = useMemo(() => {
    return BLOG_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(
      0,
      3
    );
  }, []);

  const formatCategoryName = (category: string) => {
    if (category === 'all') return 'Todas las categorías';
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="min-h-screen bg-baby-light pt-20">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-r from-baby-blue/10 to-baby-pink/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-baby-pink" />
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-baby-gray mb-6">
              Nuestro <span className="text-baby-pink">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
              Consejos, tips y artículos sobre el cuidado de tu bebé. Todo lo que necesitas saber
              para brindarle lo mejor a tu pequeño tesoro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-baby-pink" />
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-baby-gray mb-4">
              Artículos Destacados
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Los artículos más recientes y populares de nuestro blog
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-gradient-to-r from-baby-pink to-baby-blue text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Destacado
                  </div>
                </div>
                <BlogCard post={post} featured />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-baby-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Buscar artículos"
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
          </motion.div>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <span className="text-gray-600 font-inter">
              {filteredPosts.length} artículo{filteredPosts.length !== 1 ? 's' : ''} encontrado
              {filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </motion.div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-baby-gray mb-4">
              Todos los Artículos
            </h2>
          </motion.div>

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <Card className="max-w-md mx-auto p-8">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold font-poppins text-baby-gray mb-2">
                  No se encontraron artículos
                </h3>
                <p className="text-gray-600 font-inter mb-6">
                  Intenta ajustar tus filtros o términos de búsqueda
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  variant="outline"
                >
                  Limpiar filtros
                </Button>
              </Card>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Overview */}
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
                Encuentra artículos específicos sobre los temas que más te interesan
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.slice(1).map((category, index) => {
                const categoryCount = BLOG_POSTS.filter((p) => p.category === category).length;
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
                    <Card className="p-6">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-baby-blue to-baby-pink rounded-full flex items-center justify-center">
                          <Tag className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold font-poppins text-baby-gray mb-1">
                          {formatCategoryName(category)}
                        </h3>
                        <p className="text-sm text-gray-500 font-inter">
                          {categoryCount} artículo{categoryCount !== 1 ? 's' : ''}
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

      {/* Newsletter Subscription */}
      <section className="py-16 px-4 bg-gradient-to-r from-baby-blue to-baby-pink">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-6">
              ¿Te gustó nuestro contenido?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-inter">
              Suscríbete a nuestro newsletter y recibe los mejores consejos para el cuidado de tu
              bebé
            </p>

            <div className="max-w-md mx-auto flex gap-4 items-center">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 bg-white p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-baby-blue focus:border-transparent"
              />
              <Button className="text-baby-gray font-bold px-6">Suscribirse</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
