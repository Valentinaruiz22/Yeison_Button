// src/pages/ForgotPassword.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-baby-light to-baby-pink p-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md"
      >
        {/* Encabezado */}
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-baby-dark mb-2"
        >
          ¿Olvidaste tu contraseña?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-600 mb-6"
        >
          No te preocupes, ingresa tu correo electrónico y te enviaremos instrucciones para
          restablecerla.
        </motion.p>

        {/* Formulario */}
        <form className="space-y-6">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">Correo electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-baby-dark focus:outline-none transition duration-300"
              required
            />
          </motion.div>

          {/* Botón */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-baby-pink text-white py-3 rounded-xl font-bold shadow-lg transition-colors duration-300 hover:bg-baby-pink "
          >
            Enviar instrucciones
          </motion.button>
        </form>

        {/* Enlaces */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 space-y-2"
        >
          <p className="text-gray-600">
            ¿Recordaste tu contraseña?{' '}
            <Link to="/login" className="text-baby-blue font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>
          <p className="text-gray-600">
            ¿No tienes cuenta aún?{' '}
            <Link to="/register" className="text-baby-blue font-semibold hover:underline">
              Regístrate
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
