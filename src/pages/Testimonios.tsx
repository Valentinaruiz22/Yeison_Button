import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Users, Heart, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';
import  TestimonialCard  from '../components/cards/TestimonialCard';
import  Button  from '../components/ui/Button';
import  Card  from '../components/ui/Card';
import LinkButton from '../components/ui/LinkButton';

const Testimonios: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Calcular estadísticas
  const totalTestimonials = TESTIMONIALS.length;
  const averageRating = TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0) / totalTestimonials;
  const fiveStarCount = TESTIMONIALS.filter(t => t.rating === 5).length;
  const satisfactionRate = Math.round((fiveStarCount / totalTestimonials) * 100);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
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
            <MessageSquare className="w-16 h-16 mx-auto mb-6 text-baby-pink" />
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-baby-gray mb-6">
              Lo que dicen nuestros <span className="text-baby-pink">Clientes</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
              Miles de familias confían en Baby Cash para el cuidado de sus bebés. 
              Estas son sus experiencias reales con nuestros productos y servicios.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <Card className="p-8 text-center bg-gradient-to-br from-baby-blue/5 to-baby-mint/5 border-baby-blue/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-baby-blue to-baby-mint rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold font-poppins text-baby-gray mb-2">
                {totalTestimonials}+
              </h3>
              <p className="text-gray-600 font-inter">Familias satisfechas</p>
            </Card>

            <Card className="p-8 text-center bg-gradient-to-br from-baby-pink/5 to-baby-blue/5 border-baby-pink/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-baby-pink to-baby-blue rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold font-poppins text-baby-gray mb-2">
                {averageRating.toFixed(1)}
              </h3>
              <p className="text-gray-600 font-inter">Calificación promedio</p>
            </Card>

            <Card className="p-8 text-center bg-gradient-to-br from-baby-mint/5 to-baby-pink/5 border-baby-mint/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-baby-mint to-baby-pink rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold font-poppins text-baby-gray mb-2">
                {satisfactionRate}%
              </h3>
              <p className="text-gray-600 font-inter">Satisfacción total</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-16 px-4 bg-baby-light">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Quote className="w-12 h-12 mx-auto mb-4 text-baby-pink" />
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-baby-gray mb-4">
              Testimonio Destacado
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Conoce la experiencia de nuestras familias más felices
            </p>
          </motion.div>

          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-white to-baby-blue/5 shadow-xl">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-baby-blue to-baby-pink rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {TESTIMONIALS[currentTestimonial].name.charAt(0)}
                </div>

                <blockquote className="text-xl md:text-2xl font-inter text-gray-700 mb-6 italic">
                  "{TESTIMONIALS[currentTestimonial].message}"
                </blockquote>

                <div className="flex justify-center mb-4">
                  {renderStars(TESTIMONIALS[currentTestimonial].rating)}
                </div>

                <h4 className="text-lg font-bold font-poppins text-baby-gray">
                  {TESTIMONIALS[currentTestimonial].name}
                </h4>
                <p className="text-gray-500 font-inter">Cliente verificado</p>
              </div>
            </Card>

            {/* Navigation buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                onClick={prevTestimonial}
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-baby-pink w-8'
                        : 'bg-gray-300 hover:bg-baby-pink/50'
                    }`}
                    aria-label={`Ir al testimonio ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Testimonials Grid */}
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
              Todos los Testimonios
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Lee todas las experiencias de nuestras familias felices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rating Distribution */}
      <section className="py-16 px-4 bg-baby-light">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-baby-gray mb-4">
              Distribución de Calificaciones
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Transparencia total en las opiniones de nuestros clientes
            </p>
          </motion.div>

          <Card className="p-8">
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = TESTIMONIALS.filter(t => t.rating === stars).length;
                const percentage = (count / totalTestimonials) * 100;
                
                return (
                  <motion.div
                    key={stars}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (5 - stars) * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-1 w-24">
                      <span className="font-medium text-gray-700">{stars}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: (5 - stars) * 0.1 }}
                        className="h-full bg-gradient-to-r from-baby-blue to-baby-pink rounded-full"
                      />
                    </div>
                    
                    <span className="w-16 text-right font-medium text-gray-700">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                {renderStars(Math.round(averageRating))}
                <span className="ml-2 text-2xl font-bold text-baby-gray">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-gray-600 font-inter">
                Basado en {totalTestimonials} reseñas verificadas
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-baby-blue to-baby-pink">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-6">
              ¿Quieres ser parte de estas historias?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-inter">
              Únete a las miles de familias que confían en Baby Cash para el cuidado de sus bebés
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkButton
                href="/productos"
                size="lg"
                className="bg-white text-baby-gray font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explorar Productos
              </LinkButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonios;