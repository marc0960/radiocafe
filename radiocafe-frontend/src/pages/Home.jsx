import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowUpRight, User, Coffee, Lock, Mail, AlertCircle, X } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Vista previa rápida del menú
  const previewMenu = [
    { id: 1, name: 'Flat White Especial', price: '$4.50', desc: 'Doble espresso con leche cremada y notas de avellana.' },
    { id: 2, name: 'Cold Brew Radio', price: '$5.00', desc: 'Extracción en frío durante 18 horas con hielo artesanal.' },
    { id: 3, name: 'Croissant Tradicional', price: '$3.50', desc: 'Hojaldrado de mantequilla recién horneado.' }
  ];

  // Manejo de autenticación según ROL
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (isRegistering) {
      if (cleanPassword !== confirmPassword.trim()) {
        setErrorMessage('Las contraseñas no coinciden.');
        return;
      }
      if (cleanPassword.length < 6) {
        setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      login({ email: cleanEmail, role: 'CLIENTE' });
      setShowAuthModal(false);
      navigate('/catalogo');
    } else {
      // EVALUACIÓN DE CREDENCIALES ADMIN
      if (cleanEmail === 'admin@radiocafe.com' && cleanPassword === 'admin123') {
        login({ email: cleanEmail, role: 'ADMIN' });
        setShowAuthModal(false);
        navigate('/admin');
      } else {
        login({ email: cleanEmail, role: 'CLIENTE' });
        setShowAuthModal(false);
        navigate('/catalogo');
      }
    }
  };

  // Google OAuth con Filtro de Dominios
  const handleGoogleLogin = () => {
    setErrorMessage('');
    const dummyEmail = prompt("Ingresa tu correo de Google para probar el filtro:", "usuario@gmail.com");
    if (!dummyEmail) return;

    const domain = dummyEmail.split('@')[1] || '';

    if (domain.includes('edu') || domain.includes('ac.') || domain.includes('instituto')) {
      setErrorMessage(`El dominio @${domain} es institucional/educativo. Usa un correo personal u oficial.`);
      return;
    }

    login({ email: dummyEmail, role: 'CLIENTE' });
    setShowAuthModal(false);
    navigate('/catalogo');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2C221E] font-sans">
      {/* 1. NAVBAR */}
      <nav className="bg-[#E05600] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <img 
            src="/assets/logo-radiocafe.png" 
            alt="RadioCafé Logo" 
            className="w-10 h-10 object-contain rounded-full border border-white/20 bg-black/10"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="text-xl font-extrabold tracking-wider uppercase">RadioCafé</span>
        </div>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <a href="#inicio" className="hover:underline">Inicio</a>
          <a href="#esencia" className="hover:underline">Nuestra Esencia</a>
          <a href="#visitanos" className="hover:underline">Visítanos</a>
          
          <button 
            onClick={() => { setIsRegistering(false); setShowAuthModal(true); }}
            className="flex items-center space-x-1 hover:text-orange-200 transition-colors"
          >
            <User size={18} />
            <span>Iniciar sesión</span>
          </button>

          <button 
            onClick={() => { setIsRegistering(true); setShowAuthModal(true); }}
            className="bg-black text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-1 hover:bg-neutral-800 transition-all shadow-sm"
          >
            <span>Registrarse</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </nav>

      {/* 2. HERO BANNER */}
      <section id="inicio" className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">
        <div className="bg-[#FFFDF9] p-10 md:p-16 flex flex-col justify-center border-r border-orange-100">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E05600] mb-3">
            • CAFÉ DE ESPECIALIDAD · BUENA SINTONÍA
          </span>
          <h1 className="text-5xl font-black tracking-tight leading-tight mb-6 font-serif text-[#2C221E]">
            Tu pausa,<br />en nuestra<br /><span className="italic text-[#E05600]">frecuencia.</span>
          </h1>
          <p className="text-neutral-600 mb-8 max-w-md text-base leading-relaxed">
            Café con origen, pan recién hecho y canciones que se quedan. Sintoniza un momento solo para ti.
          </p>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => { setIsRegistering(true); setShowAuthModal(true); }}
              className="bg-[#E05600] text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-[#C04800] transition-all shadow-md"
            >
              <span>Descubre el catálogo</span>
              <ArrowUpRight size={18} />
            </button>
            <span className="text-xs text-neutral-500 font-medium italic">Sin prisa. Con mucho café.</span>
          </div>
        </div>

        <div className="relative bg-neutral-200 min-h-[350px]">
          <img 
            src="/assets/hero-coffee.jpg" 
            alt="Barista vertiendo café" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop';
            }}
          />
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-neutral-800 shadow">
            EN NUESTRA ONDA: FLAT WHITE DUPLE
          </div>
        </div>
      </section>

      {/* CINTILLO BANNER */}
      <div className="bg-[#E05600] text-white py-3 overflow-hidden border-y border-orange-600">
        <div className="flex justify-around text-sm font-bold tracking-wider uppercase">
          <span>Café con origen *</span>
          <span>Pan recién hecho *</span>
          <span>Buenas conversaciones *</span>
          <span>Siempre en tu frecuencia *</span>
        </div>
      </div>

      {/* 3. VISTA PREVIA RÁPIDA DEL CATÁLOGO */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-serif mb-2">Un vistazo a nuestro Menú</h2>
          <p className="text-neutral-600 text-sm">Regístrate o inicia sesión para realizar pedidos e interactuar con la comunidad.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewMenu.map((item) => (
            <div key={item.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-neutral-900">{item.name}</h3>
                <span className="bg-orange-100 text-[#E05600] font-extrabold px-3 py-1 rounded-full text-sm">{item.price}</span>
              </div>
              <p className="text-neutral-500 text-sm mb-4 leading-relaxed">{item.desc}</p>
              <button 
                onClick={() => { setIsRegistering(false); setShowAuthModal(true); }}
                className="w-full text-center text-xs font-semibold text-[#E05600] hover:underline flex items-center justify-center space-x-1"
              >
                <span>Iniciar sesión para ordenar</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MODAL DE AUTENTICACIÓN */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-orange-100 grid grid-cols-1 md:grid-cols-2 relative hover:shadow-[0_20px_50px_rgba(224,86,0,0.2)] transition-all duration-300 transform hover:-translate-y-1">
            
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 bg-white/80 p-1.5 rounded-full z-10 hover:rotate-90 transition-transform duration-200"
            >
              <X size={20} />
            </button>

            {/* Mascot Kappu Column */}
            <div className="bg-[#FFF8F0] p-8 flex flex-col items-center justify-center border-r border-orange-100 text-center group">
              <div className="w-44 h-44 mb-4 relative flex items-center justify-center overflow-hidden rounded-2xl">
                <img 
                  src="/assets/kappu-mascota.png" 
                  alt="Mascota Kappu" 
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden flex-col items-center justify-center bg-orange-100 text-[#E05600] w-full h-full rounded-2xl p-4">
                  <Coffee size={48} className="mb-2" />
                  <span className="text-xs font-bold">[Mascota Kappu]</span>
                </div>
              </div>

              <h3 className="font-bold text-lg text-neutral-800 mb-1 group-hover:text-[#E05600] transition-colors">RadioCafé</h3>
              <p className="text-xs text-neutral-500 max-w-xs">
                {isRegistering ? 'Crea tu cuenta para acceder a promociones y al concurso Kappu.' : '¡Sintoniza con tu cuenta y ordena tus favoritos!'}
              </p>
            </div>

            {/* Form Column */}
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-black text-neutral-900 mb-2 uppercase tracking-wider">
                {isRegistering ? 'Registrarse' : 'Inicio Sesión'}
              </h2>

              {errorMessage && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs p-2.5 rounded-xl flex items-center space-x-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Botón Google Auth */}
              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-neutral-300 text-neutral-700 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 hover:bg-orange-50 hover:border-[#E05600] hover:text-[#E05600] transition-all duration-200 mb-4 shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continuar con Google (Oficial)</span>
              </button>

              <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-neutral-200"></div>
                <span className="flex-shrink mx-2 text-[10px] text-neutral-400 font-bold uppercase">O usa tu correo</span>
                <div className="flex-grow border-t border-neutral-200"></div>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Correo electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-neutral-400" size={16} />
                    <input 
                      type="email"
                      required
                      placeholder="admin@radiocafe.com o cliente@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#E05600] outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 text-neutral-400" size={16} />
                    <input 
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#E05600] outline-none text-xs"
                    />
                  </div>
                </div>

                {isRegistering && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Confirmar contraseña</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 text-neutral-400" size={16} />
                      <input 
                        type="password"
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#E05600] outline-none text-xs"
                      />
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-[#E05600] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#C04800] hover:shadow-lg transition-all shadow-md mt-2"
                >
                  {isRegistering ? 'Registrarse' : 'Ingresar'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button 
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setErrorMessage('');
                  }}
                  className="text-xs font-semibold text-[#E05600] hover:underline"
                >
                  {isRegistering ? '¿Ya tienes cuenta? Inicia sesión aquí' : '¿No tienes cuenta? Regístrate aquí'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}