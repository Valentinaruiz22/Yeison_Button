import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import ProductCard2 from '../components/cards/ProductCard2';
import LinkButton from '../components/ui/LinkButton';

const Productos2: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/productos') // Ajusta esta URL si tu backend usa otra ruta
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log('Productos desde backend:', data);
      })
      .catch((err) => console.error('Error al conectar con backend:', err));
  }, []);

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
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-baby-pink" />
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-baby-gray mb-6">
              Nuestros <span className="text-baby-pink">Productos</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
              Descubre nuestra selección de productos de alta calidad para tu bebé.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 font-inter">No se encontraron productos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: any, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                >
                  <ProductCard2 product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

export default Productos2;
