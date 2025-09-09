import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Shield, Heart, DollarSign, ArrowRight, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/cards/ProductCard';
import TestimonialCard from '../components/cards/TestimonialCard';
import BlogCard from '../components/cards/BlogCard';
import { PRODUCTS } from '../data/products';
import { TESTIMONIALS } from '../data/testimonials';
import { BLOG_POSTS } from '../data/blog';

const Home = () => {
  // Productos destacados (primeros 6)
  const featuredProducts = PRODUCTS.slice(0, 6);

  // Testimonios destacados (primeros 3)
  const featuredTestimonials = TESTIMONIALS.slice(0, 3);

  // Artículos destacados del blog (primeros 3)
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  const benefits = [
    {
      icon: Truck,
      title: 'Envíos Rápidos',
      description: 'Entrega en 24-48 horas en Bogotá y principales ciudades de Colombia.',
    },
    {
      icon: Shield,
      title: 'Productos Originales',
      description: 'Garantizamos la autenticidad y calidad de todos nuestros productos.',
    },
    {
      icon: Heart,
      title: 'Atención Personalizada',
      description: 'Te asesoramos para encontrar los mejores productos para tu bebé.',
    },
    {
      icon: DollarSign,
      title: 'Precios Justos',
      description: 'Ofrecemos los mejores precios del mercado sin comprometer la calidad.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-baby-blue/20 via-baby-pink/20 to-baby-mint/20 py-20 lg:py-32">
        {/* Formas decorativas */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-baby-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-baby-pink/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-baby-mint/10 rounded-full blur-xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenido textual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-baby-gray mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-baby-blue to-baby-pink bg-clip-text text-transparent">
                  BABY CASH
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Pañalera y variedades {`Soffy's`}
              </motion.p>

              <motion.p
                className="text-lg text-gray-600 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                💕 “El lugar donde encuentras cuidado, dulzura y todo lo que tu pequeño necesita.”
                💕
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link to="/productos">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explorar Productos
                    <ArrowRight size={20} />
                  </Button>
                </Link>

                <Link to="/contacto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Contáctanos
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Ilustración animada mejorada */}
            <motion.div
              className="relative w-56 sm:w-64 lg:w-72 mx-auto"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/productos/icono-pinguino.png"
                alt="Mascota Pingüino"
                className="w-full h-auto object-contain"
              />

              {/* Burbujas animadas */}
              <motion.div
                className="absolute top-0 left-1/4 w-4 h-4 bg-yellow-400 rounded-full"
                animate={{ y: [10, -20, 10], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute top-1/4 right-1/4 w-3 h-3 bg-pink-400 rounded-full"
                animate={{ y: [10, -10, 10], opacity: [1, 0.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-baby-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-baby-gray mb-4">
              ¿Por qué elegir Baby Cash?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Baby Cash es sinónimo de amor, cuidado y calidad.Nuestro propósito es acompañarte en
              cada momento especial con tu bebé, asegurando que siempre tengas lo mejor a tu
              alcance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group p-8 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-baby-pink/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-baby-blue to-baby-pink rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-baby-gray mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-20 bg-baby-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-baby-gray mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Los productos más populares y recomendados por nuestros clientes
            </p>
            <Link to="/productos">
              <Button variant="outline" size="lg">
                Ver Todos los Productos
                <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.TITULO}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-baby-gray mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-current" />
              ))}
              <span className="text-lg font-semibold text-baby-gray ml-2">5.0</span>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Miles de familias confían en nosotros
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/testimonios">
              <Button variant="outline">
                Ver Más Testimonios
                <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 bg-baby-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-baby-gray mb-4">
              Consejos para Papás
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Guías y consejos útiles para el cuidado de tu bebé
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <BlogCard
                  post={post}
                  onReadMore={() => {
                    // Aquí iría la navegación al artículo completo
                    console.log('Leer más:', post.id);
                  }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/blog">
              <Button variant="outline">
                Ver Todos los Artículos
                <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-baby-blue to-baby-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-white mb-4">
              ¿Listo para visitar nuestra tienda?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Ven y descubre todos nuestros productos. Te esperamos con la mejor atención y los
              mejores precios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/productos">
                <Button
                  variant="secondary"
                  size="lg"
                  className=" text-baby-blue hover:bg-gray-100 w-full sm:w-auto"
                >
                  Ver Productos
                </Button>
              </Link>
              <Link to="/contacto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:text-baby-blue w-full sm:w-auto"
                >
                  Contáctanos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
