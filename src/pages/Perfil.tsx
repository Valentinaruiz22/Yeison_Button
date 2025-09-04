import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Edit3, Save, Mail, Phone, MapPin, Calendar, Package, Heart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import  Button  from '../components/ui/Button';
import  Input from '../components/ui/input';
import  Card  from '../components/ui/Card';
import LinkButton from '../components/ui/LinkButton';

const Perfil: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || 'María García',
    email: user?.email || 'maria.garcia@email.com',
    phone: '(+57) 300 123 4567',
    address: 'Calle 123 #45-67, Bogotá',
    birthDate: '1990-05-15'
  });

  const handleSave = () => {
    // Aquí se implementará la lógica de actualización con el backend
    console.log('Datos actualizados:', editData);
    setIsEditing(false);
    // Mostrar toast de éxito
  };

  const handleLogout = () => {
    logout();
    // Redirigir al home o página de login
    window.location.href = '/';
  };

  // Si no está autenticado, mostrar mensaje
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-baby-light pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <Card className="max-w-md mx-auto p-8">
            <User className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold font-poppins text-baby-gray mb-4">
              Inicia Sesión
            </h2>
            <p className="text-gray-600 font-inter mb-8">
              Debes iniciar sesión para ver tu perfil
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-baby-blue to-baby-pink text-white"
            >
              Iniciar Sesión
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { label: 'Pedidos realizados', value: '12', icon: Package },
    { label: 'Productos favoritos', value: '8', icon: Heart },
    { label: 'Años con nosotros', value: '2', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-baby-light pt-20">
      {/* Header */}
      <section className="py-8 px-4 bg-gradient-to-r from-baby-blue/10 to-baby-pink/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-baby-blue to-baby-pink rounded-full flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-poppins text-baby-gray">
                  Mi Perfil
                </h1>
                <p className="text-gray-600 font-inter">
                  Bienvenid@ de nuevo, {editData.name.split(' ')[0]}
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-poppins text-baby-gray">
                    Información Personal
                  </h2>
                  <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    variant="outline"
                    size="sm"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Editar
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        placeholder="Nombre completo"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="font-inter">{editData.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        placeholder="Correo electrónico"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="font-inter">{editData.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        placeholder="Número de teléfono"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="font-inter">{editData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Nacimiento
                    </label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={editData.birthDate}
                        onChange={(e) => setEditData({ ...editData, birthDate: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="font-inter">
                          {new Date(editData.birthDate).toLocaleDateString('es-CO')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    {isEditing ? (
                      <Input
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                        placeholder="Dirección completa"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="font-inter">{editData.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h2 className="text-xl font-bold font-poppins text-baby-gray mb-6">
                  Acciones Rápidas
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LinkButton
                    href="/productos"
                    variant="outline"
                    className="justify-center"
                    size="md"
                  >
                    <Package className="w-5 h-5 mr-2" />
                    Ver Productos
                  </LinkButton>
                  <LinkButton
                    href="/carrito"
                    variant="outline"
                    className="justify-center"
                    size="md"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Ver Carrito
                  </LinkButton>
                  <LinkButton
                    href="/contacto"
                    variant="outline"
                    className="justify-center"
                    size="md"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contactar Soporte
                  </LinkButton>
                  <Button
                    variant="outline"
                    className="justify-center"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Configuración
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Stats & Quick Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Stats */}
              <Card className="p-6 bg-gradient-to-br from-baby-blue/5 to-baby-pink/5 border-baby-blue/20">
                <h3 className="text-lg font-bold font-poppins text-baby-gray mb-4">
                  Tu Actividad
                </h3>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-baby-blue to-baby-pink rounded-full flex items-center justify-center mr-3">
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-inter text-gray-600 text-sm">
                          {stat.label}
                        </span>
                      </div>
                      <span className="font-bold font-poppins text-baby-pink text-xl">
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Account Info */}
              <Card className="p-6">
                <h3 className="text-lg font-bold font-poppins text-baby-gray mb-4">
                  Tu Cuenta
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo de cuenta:</span>
                    <span className="font-medium text-baby-pink">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Miembro desde:</span>
                    <span className="font-medium">Marzo 2022</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="font-medium text-green-600">Activo</span>
                  </div>
                </div>
              </Card>

              {/* Loyalty Program */}
              <Card className="p-6 bg-gradient-to-br from-baby-mint/10 to-baby-blue/10 border-baby-mint/20">
                <h3 className="text-lg font-bold font-poppins text-baby-gray mb-4">
                  Programa de Fidelidad
                </h3>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-baby-mint to-baby-blue rounded-full flex items-center justify-center">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Puntos acumulados</p>
                  <p className="text-2xl font-bold font-poppins text-baby-mint">1,250</p>
                  <p className="text-xs text-gray-500 mt-2">
                    ¡750 puntos más para tu próximo descuento!
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;