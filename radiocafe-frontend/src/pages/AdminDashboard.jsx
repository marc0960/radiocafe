import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  Trophy, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  Heart
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'kappu'

  // ==========================================
  // 1. MÓDULO GESTIÓN DE CATÁLOGO DE PRODUCTOS
  // ==========================================
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Flat White', categoria: 'CAFE', precio: 4.50, estado: 'Disponible' },
    { id: 2, nombre: 'Cold Brew', categoria: 'CAFE', precio: 5.00, estado: 'Disponible' },
    { id: 3, nombre: 'Croissant Mantequilla', categoria: 'PASTELERIA', precio: 3.50, estado: 'Disponible' }
  ]);

  const [nombreProducto, setNombreProducto] = useState('');
  const [categoria, setCategoria] = useState('CAFE');
  const [precio, setPrecio] = useState('');

  const handleAgregarProducto = (e) => {
    e.preventDefault();
    if (!nombreProducto || !precio) return;

    const nuevo = {
      id: Date.now(),
      nombre: nombreProducto,
      categoria,
      precio: parseFloat(precio),
      estado: 'Disponible'
    };

    setProductos([...productos, nuevo]);
    setNombreProducto('');
    setPrecio('');
  };

  const handleEliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  // ==========================================
  // 2. MÓDULO CONCURSO KAPPU (SELECCIÓN ÚNICA)
  // ==========================================
  const [participantes, setParticipantes] = useState([
    { 
      id: 'KAPPU-01', 
      titulo: 'Kappu Tomando Espresso', 
      autor: 'Lucía M.', 
      votos: 142, 
      img: '/assets/kappu-mascota.png',
      codigo: 'KAPPU-WIN-IIRAB1'
    },
    { 
      id: 'KAPPU-02', 
      titulo: 'Kappu en la Estación de Radio', 
      autor: 'Carlos R.', 
      votos: 98, 
      img: '/assets/kappu-mascota.png',
      codigo: 'KAPPU-WIN-3FUN4V'
    },
    { 
      id: 'KAPPU-03', 
      titulo: 'Zorrito Kappu Neón', 
      autor: 'Elena P.', 
      votos: 85, 
      img: '/assets/kappu-mascota.png',
      codigo: 'KAPPU-WIN-0LT50T'
    }
  ]);

  // Selección borrador y ganador oficial confirmado
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [confirmedWinnerId, setConfirmedWinnerId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Seleccionar candidato borrador (Solo 1 a la vez)
  const handleSelectCandidate = (id) => {
    if (confirmedWinnerId) return; // Si ya se confirmó, bloquear cambios
    setSelectedCandidateId(id);
  };

  // Confirmar Ganador Oficial
  const handleConfirmWinner = () => {
    if (!selectedCandidateId) return;
    setConfirmedWinnerId(selectedCandidateId);
    setShowConfirmModal(false);
  };

  // Resetear selección en caso de error o reiniciar concurso
  const handleResetWinner = () => {
    setConfirmedWinnerId(null);
    setSelectedCandidateId(null);
  };

  // Cierre de Sesión Seguro
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex font-sans text-neutral-800">
      
      {/* SIDEBAR LATERAL NAVEGACIÓN */}
      <aside className="w-64 bg-[#2C221E] text-white flex flex-col justify-between shrink-0 shadow-xl">
        <div>
          {/* Logo Brand */}
          <div className="p-6 flex items-center space-x-3 border-b border-neutral-700">
            <img 
              src="/assets/logo-radiocafe.png" 
              alt="RadioCafé Logo" 
              className="w-8 h-8 rounded-full border border-white/20 object-contain bg-black/30"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="font-extrabold text-sm tracking-wider uppercase text-orange-400">ADMIN PANEL</span>
          </div>

          {/* Menú de Opciones */}
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'catalog' 
                  ? 'bg-[#E05600] text-white shadow-md' 
                  : 'text-neutral-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <ShoppingBag size={18} />
              <span>Gestión de Catálogo</span>
            </button>

            <button 
              onClick={() => setActiveTab('kappu')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'kappu' 
                  ? 'bg-[#E05600] text-white shadow-md' 
                  : 'text-neutral-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Trophy size={18} />
              <span>Concurso Kappu</span>
            </button>
          </nav>
        </div>

        {/* Botón Salir */}
        <div className="p-4 border-t border-neutral-700">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* VISTA 1: GESTIÓN DE CATÁLOGO */}
        {activeTab === 'catalog' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div>
              <h1 className="text-3xl font-black text-neutral-900">Catálogo de Productos</h1>
              <p className="text-xs text-neutral-500 mt-1">Agrega, modifica o deshabilita artículos del menú público.</p>
            </div>

            {/* Formulario Agregar Producto */}
            <form onSubmit={handleAgregarProducto} className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1">Nombre Producto</label>
                <input 
                  type="text" 
                  placeholder="Ej. Capuchino Vainilla"
                  value={nombreProducto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:ring-2 focus:ring-[#E05600]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1">Categoría</label>
                <select 
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:ring-2 focus:ring-[#E05600] bg-white"
                >
                  <option value="CAFE">CAFÉ</option>
                  <option value="PASTELERIA">PASTELERIA</option>
                  <option value="COMBO">COMBO</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1">Precio ($)</label>
                <div className="flex space-x-2">
                  <input 
                    type="number" 
                    step="0.1"
                    placeholder="4.50"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:ring-2 focus:ring-[#E05600]"
                  />
                  <button 
                    type="submit"
                    className="bg-[#E05600] text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-[#C04800] transition-colors shrink-0 flex items-center space-x-1"
                  >
                    <Plus size={16} />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Tabla de Productos */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-black uppercase text-neutral-400">
                    <th className="p-4">Producto</th>
                    <th className="p-4">Categoría</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {productos.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 font-bold text-neutral-800">{p.nombre}</td>
                      <td className="p-4">
                        <span className="bg-orange-100 text-[#E05600] font-extrabold text-[9px] px-2.5 py-0.5 rounded-full">
                          {p.categoria}
                        </span>
                      </td>
                      <td className="p-4 font-extrabold text-neutral-900">${p.precio.toFixed(2)}</td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-700 font-bold text-[10px] px-2 py-0.5 rounded-full">
                          {p.estado}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button className="p-1.5 hover:bg-neutral-200 rounded-lg text-neutral-600 transition-colors">
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleEliminarProducto(p.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VISTA 2: JURADO CONCURSO KAPPU (SELECCIÓN ÚNICA CON CONFIRMACIÓN) */}
        {activeTab === 'kappu' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-black text-neutral-900">Jurado Concurso Kappu</h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Selecciona a <strong className="text-neutral-800">un solo Ganador Oficial</strong> entre los 3 más votados por la comunidad.
                </p>
              </div>

              {/* Botón de Confirmación Submit */}
              {selectedCandidateId && !confirmedWinnerId && (
                <button 
                  onClick={() => setShowConfirmModal(true)}
                  className="bg-[#E05600] text-white px-6 py-2.5 rounded-2xl font-bold text-xs flex items-center space-x-2 hover:bg-[#C04800] transition-all shadow-md animate-bounce"
                >
                  <Award size={16} />
                  <span>Confirmar Selección</span>
                </button>
              )}

              {confirmedWinnerId && (
                <button 
                  onClick={handleResetWinner}
                  className="text-xs font-bold text-neutral-500 hover:text-red-600 underline transition-colors"
                >
                  Reiniciar Selección
                </button>
              )}
            </div>

            {/* Tarjetas de Participantes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {participantes.map((item) => {
                const isSelected = selectedCandidateId === item.id;
                const isConfirmed = confirmedWinnerId === item.id;

                return (
                  <div 
                    key={item.id}
                    onClick={() => handleSelectCandidate(item.id)}
                    className={`bg-white rounded-3xl p-5 border-2 transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                      isConfirmed 
                        ? 'border-green-500 ring-4 ring-green-100 shadow-xl bg-green-50/20' 
                        : isSelected 
                          ? 'border-[#E05600] ring-4 ring-orange-100 shadow-lg scale-[1.02]' 
                          : 'border-neutral-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Imagen con badge */}
                      <div className="bg-[#FFF8F0] rounded-2xl p-4 mb-4 flex justify-center items-center relative overflow-hidden">
                        <img 
                          src={item.img} 
                          alt={item.titulo} 
                          className="w-32 h-32 object-contain"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-black text-neutral-600 flex items-center space-x-1 shadow-sm">
                          <Heart size={10} className="text-red-500 fill-red-500" />
                          <span>{item.votos} votos</span>
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-neutral-900">{item.titulo}</h3>
                      <p className="text-xs text-neutral-500 mb-4">Por: {item.autor}</p>
                    </div>

                    {/* Estado visual de selección */}
                    <div className="mt-2">
                      {isConfirmed ? (
                        <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-2xl text-center space-y-1">
                          <div className="flex items-center justify-center space-x-1 text-xs font-black uppercase">
                            <CheckCircle2 size={16} className="text-green-600" />
                            <span>¡GANADOR OFICIAL!</span>
                          </div>
                          <p className="text-[10px] font-mono bg-white/60 py-0.5 rounded">{item.codigo}</p>
                        </div>
                      ) : isSelected ? (
                        <div className="bg-orange-100 border border-[#E05600] text-[#E05600] p-2.5 rounded-2xl text-center font-bold text-xs flex items-center justify-center space-x-1">
                          <CheckCircle2 size={14} />
                          <span>Seleccionado (Pendiente Submit)</span>
                        </div>
                      ) : (
                        <button 
                          disabled={Boolean(confirmedWinnerId)}
                          className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-2.5 rounded-2xl font-bold text-xs transition-colors"
                        >
                          Elegir como Ganador
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* MODAL DE CONFIRMACIÓN SUBMIT DE GANADOR */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-orange-100 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-[#E05600]">
              <AlertTriangle size={28} className="shrink-0" />
              <h3 className="font-black text-lg text-neutral-900">¿Confirmar Ganador Oficial?</h3>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Estás a punto de nombrar como ganador oficial a: <strong className="text-neutral-900">
                {participantes.find(p => p.id === selectedCandidateId)?.titulo}
              </strong>. 
              Esta acción emitirá el código de canje para el concurso Kappu.
            </p>

            <div className="flex space-x-3 pt-2">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-2.5 rounded-xl font-bold text-xs transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmWinner}
                className="flex-1 bg-[#E05600] hover:bg-[#C04800] text-white py-2.5 rounded-xl font-bold text-xs transition-colors shadow-md"
              >
                Sí, Confirmar Ganador
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}