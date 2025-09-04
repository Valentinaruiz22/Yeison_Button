// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth(); // función de AuthContext
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Debes aceptar los términos y el tratamiento de datos.");
      return;
    }

    try {
      await login(email, password); // simulando login con AuthContext
      navigate("/"); // redirige al inicio
    } catch (err) {
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-baby-blue via-baby-pink to-baby-mint px-4 pt-24 md:pt-28 pb-20 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/productos/icono-pinguino.png"
            alt="Logo Pingüino"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Inicia sesión en <span className="text-baby-blue">Baby Cash</span>
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-baby-blue"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-baby-blue"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Acepto los{" "}
              <Link
                to="/terminos"
                className="text-baby-blue font-medium hover:underline"
              >
                términos y condiciones
              </Link>{" "}
              y el{" "}
              <Link
                to="/privacidad"
                className="text-baby-blue font-medium hover:underline"
              >
                tratamiento de datos
              </Link>
              .
            </label>
          </div>

          {/* Botón */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-baby-blue text-white rounded-lg font-semibold shadow-md hover:bg-baby-pink transition"
          >
            Iniciar sesión
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-baby-blue font-medium hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
          <p className="mt-2">
            <Link
              to="/forgot-password"
              className="text-baby-pink font-medium hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
