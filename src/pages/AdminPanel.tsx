import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Mock de productos
const mockProductos = [
  { id: '1', nombre: 'Pañal Premium', precio: 25000, stock: 10, categoria: 'Pañales', destacado: true, imagen: '/productos/icono-pinguino.png' },
  { id: '2', nombre: 'Toallitas Húmedas', precio: 8000, stock: 5, categoria: 'Higiene', destacado: false, imagen: '/productos/icono-pinguino.png' },
  { id: '3', nombre: 'Body Algodón', precio: 18000, stock: 2, categoria: 'Ropa', destacado: false, imagen: '/productos/icono-pinguino.png' },
];

const sidebarItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'productos', label: 'Productos' },
  { key: 'categorias', label: 'Categorías' },
  { key: 'clientes', label: 'Clientes' },
  { key: 'pedidos', label: 'Pedidos' },
  { key: 'pagos', label: 'Pagos' },
  { key: 'blog', label: 'Blog' },
  { key: 'mensajes', label: 'Mensajes' },
  { key: 'admins', label: 'Administradores' },
  { key: 'reportes', label: 'Reportes' },
];

const AdminPanel: React.FC = () => {
  const [section, setSection] = useState('dashboard');
  const [productos] = useState(mockProductos);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-baby-blue/10 to-baby-pink/10">
      {/* Sidebar */}
      <aside className="w-56 bg-white/90 border-r border-gray-200 p-4 flex flex-col gap-2 shadow-lg">
        <h2 className="text-xl font-bold text-baby-pink mb-6 text-center">Admin</h2>
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${section === item.key ? 'bg-baby-blue/10 text-baby-blue' : 'hover:bg-baby-blue/5 text-gray-700'}`}
            onClick={() => setSection(item.key)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {section === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <h1 className="text-3xl font-bold text-baby-pink mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <Card className="p-6 flex flex-col items-center shadow-lg">
                <span className="text-3xl font-bold text-baby-blue">12</span>
                <span className="text-gray-500 mt-2">Ventas del día</span>
              </Card>
              <Card className="p-6 flex flex-col items-center shadow-lg">
                <span className="text-3xl font-bold text-baby-pink">320</span>
                <span className="text-gray-500 mt-2">Ventas del mes</span>
              </Card>
              <Card className="p-6 flex flex-col items-center shadow-lg">
                <span className="text-3xl font-bold text-yellow-500">5</span>
                <span className="text-gray-500 mt-2">Pedidos pendientes</span>
              </Card>
              <Card className="p-6 flex flex-col items-center shadow-lg">
                <span className="text-3xl font-bold text-red-500">3</span>
                <span className="text-gray-500 mt-2">Productos con poco stock</span>
              </Card>
            </div>
            {/* Últimos clientes registrados */}
            <Card className="mb-10 p-6 shadow-lg">
              <h2 className="text-xl font-bold text-baby-blue mb-4">Últimos clientes registrados</h2>
              <ul>
                <li className="py-1 border-b flex justify-between"><span>Ana Ruiz</span><span className="text-gray-500 text-sm">ana@email.com</span></li>
                <li className="py-1 border-b flex justify-between"><span>Carlos Pérez</span><span className="text-gray-500 text-sm">carlos@email.com</span></li>
                <li className="py-1 flex justify-between"><span>Luisa Gómez</span><span className="text-gray-500 text-sm">luisa@email.com</span></li>
              </ul>
            </Card>
          </motion.div>
        )}

        {section === 'productos' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <h1 className="text-3xl font-bold text-baby-blue mb-8">Gestión de Productos</h1>
            <div className="flex justify-end mb-4">
              <Button className="bg-baby-pink text-white">Agregar producto</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="bg-baby-blue/10">
                    <th className="p-2">Imagen</th>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Precio</th>
                    <th className="p-2">Stock</th>
                    <th className="p-2">Categoría</th>
                    <th className="p-2">Destacado</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id} className="border-b">
                      <td className="p-2"><img src={prod.imagen} alt={prod.nombre} className="w-12 h-12 object-contain rounded" /></td>
                      <td className="p-2">{prod.nombre}</td>
                      <td className="p-2">${prod.precio}</td>
                      <td className="p-2">{prod.stock}</td>
                      <td className="p-2">{prod.categoria}</td>
                      <td className="p-2">
                        {prod.destacado ? <span className="text-green-500 font-bold">Sí</span> : <span className="text-gray-400">No</span>}
                      </td>
                      <td className="p-2 flex gap-2">
                        <Button size="sm" variant="outline">Editar</Button>
                        <Button size="sm" variant="outline" className="text-red-500">Eliminar</Button>
                        <Button size="sm" variant="outline" className="text-yellow-500">Destacar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
