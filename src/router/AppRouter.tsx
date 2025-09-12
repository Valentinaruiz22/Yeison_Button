import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Preloader from '../components/ui/Preloader';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Lazy loading de páginas
const Home = React.lazy(() => import('../pages/Home'));
const Nosotros = React.lazy(() => import('../pages/Nosotros'));
const Productos = React.lazy(() => import('../pages/Productos'));
const Productos2 = React.lazy(() => import('../pages/productos2')); // <-- Aquí agregué este import
const Carrito = React.lazy(() => import('../pages/Carrito'));
const Perfil = React.lazy(() => import('../pages/Perfil'));
const Contacto = React.lazy(() => import('../pages/Contacto'));
const Blog = React.lazy(() => import('../pages/Blog'));
const Testimonios = React.lazy(() => import('../pages/Testimonios'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Auth pages
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'));

const AppRouter: React.FC = () => {
  return (
    <div className="min-h-screen bg-baby-light flex flex-col">
      <Navbar />

      <motion.main
        className="flex-1 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos2" element={<Productos2 />} />{' '}
            {/* <-- Aquí cambié Productos por Productos2 */}
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimonios" element={<Testimonios />} />
            {/* Rutas de autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* NotFound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>

      <Footer />
    </div>
  );
};

export default AppRouter;
