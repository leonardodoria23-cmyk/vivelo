import React, { useState } from 'react';
import { Home, Video, Menu, X, ChevronRight, Lock, Check, Download, Play, Star, MapPin, Clock, Shield, Bell, CreditCard, Smartphone, Building2, AlertTriangle, CheckCircle, XCircle, TrendingUp, Users, DollarSign, Package } from 'lucide-react';

const Vivelo_v5 = () => {
  const [currentView, setCurrentView] = useState('home');
  const [authStep, setAuthStep] = useState('welcome');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptHabeas, setAcceptHabeas] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [adminRequests, setAdminRequests] = useState([
    { id: 1, name: 'Hotel Boutique Costa', city: 'Santa Marta', type: 'Alojamiento', docs: 3, time: '2h ago', image: '🏨', status: 'pending' },
    { id: 2, name: 'Pedro Fotografía', city: 'Cartagena', type: 'Servicio', docs: 2, time: '5h ago', image: '📸', status: 'pending' },
    { id: 3, name: 'Caribbean Diving SAS', city: 'San Andrés', type: 'Experiencia', docs: 5, time: '1d ago', image: '🤿', status: 'verified' },
  ]);
  const [adminTab, setAdminTab] = useState('solicitudes');
  const [notifPush, setNotifPush] = useState(true);
  const [notifMkt, setNotifMkt] = useState(false);
  const [verifyError, setVerifyError] = useState(false);
  const [referencia, setReferencia] = useState('');


  const adminStats = {
    pendientes: adminRequests.filter(r => r.status === 'pending').length,
    aprobadosHoy: 7,
    reservasMes: 142,
    ingresos: 8400000,
    proveedores: 87,
    usuarios: 1543
  };

  const experiencias = [
    { id: 1, title: 'Jetski en Santa Marta', price: 250000, image: '🚤', rating: 4.9, reviews: 234, location: 'Santa Marta', desc: 'Adrenalina pura en el Caribe colombiano' },
    { id: 2, title: 'Paracaidismo Cartagena', price: 800000, image: '🪂', rating: 4.8, reviews: 156, location: 'Cartagena', desc: 'Vuela sobre la ciudad amurallada' },
    { id: 3, title: 'Buceo San Andrés', price: 180000, image: '🤿', rating: 5.0, reviews: 89, location: 'San Andrés', desc: 'Explora el mar de los 7 colores' },
    { id: 4, title: 'Tour Tayrona', price: 95000, image: '🥾', rating: 4.7, reviews: 312, location: 'Santa Marta', desc: 'Naturaleza pura en el Parque Tayrona' },
  ];

  const alojamientos = [
    { id: 5, title: 'Resort Caribeño Lujo', price: 450000, image: '🏖️', rating: 4.9, location: 'Cartagena', desc: 'Todo incluido frente al mar' },
    { id: 6, title: 'Casa Playa Privada', price: 320000, image: '🏡', rating: 4.8, location: 'San Andrés', desc: 'Tu propio paraíso privado' },
    { id: 7, title: 'Boutique Hotel Centro', price: 280000, image: '🏨', rating: 4.7, location: 'Santa Marta', desc: 'Encanto colonial en el corazón de la ciudad' },
  ];

  const flyview23Videos = [
    { id: 1, title: 'Sesión Jetski + Dron 4K', status: 'ready', size: '2.3GB', quality: '4K', duration: '12:45' },
    { id: 2, title: 'Luna de Miel Cartagena', status: 'ready', size: '1.8GB', quality: '4K', duration: '18:30' },
    { id: 3, title: 'Evento Corporativo', status: 'processing', size: '3.2GB', quality: '4K', duration: '45:00', progress: 67 },
  ];

  const reservationItem = selectedExperience || experiencias[0];
  const totalPrice = reservationItem.price * 2;
  const confCode = 'VV-2026-' + Math.floor(1000 + Math.random() * 9000);

  const handleAdminAction = (id, action) => {
    setAdminRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

  const sendCode = async (email) => { const code = Math.floor(100000 + Math.random() * 900000).toString(); localStorage.setItem("viveloCode", code); await fetch("/api/send-code", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,code})}); };
  const handleVerify = () => {
    if (verifyCode === localStorage.getItem("viveloCode")) { setVerifyError(false); setAuthStep('legal'); }
    else { setVerifyError(true); }
  };

  // LEGAL MODAL
  const renderLegalModal = () => {
    if (!showLegalModal) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 overflow-y-auto flex items-start justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg my-8 shadow-2xl">
          <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white rounded-t-2xl">
            <h2 className="text-xl font-bold text-caribbean">{showLegalModal === 'terms' ? '📋 Términos y Condiciones' : '🔒 Política de Habeas Data'}</h2>
            <button onClick={() => setShowLegalModal(null)} className="p-2 hover:bg-gray-100 rounded-full transition"><X size={20} /></button>
          </div>
          <div className="p-6 space-y-4 text-sm text-gray-700 max-h-96 overflow-y-auto">
            {showLegalModal === 'terms' ? (
              <>
                <Section title="1. Naturaleza de la Plataforma" text="Vívelo es una plataforma intermediaria entre turistas y proveedores. No somos responsables de las acciones, omisiones o fraudes de terceros." />
                <Section title="2. Comprobantes de Pago" text="Presentar un comprobante falso resultará en ban permanente de la plataforma y reporte a las autoridades colombianas competentes." />
                <Section title="3. Cancelaciones" text="Las cancelaciones con más de 48h de anticipación reciben reembolso del 100%. Menos de 48h, se retiene el 50% como garantía." />
                <Section title="4. Responsabilidad" text="Vívelo actúa como intermediario. Los proveedores son responsables de la prestación del servicio contratado." />
                <Section title="5. Jurisdicción" text="Estos términos se rigen por las leyes de la República de Colombia. Disputas serán resueltas en juzgados de Santa Marta." />
                <p className="text-xs text-gray-500 pt-2">Contacto: legal@vivelo.co</p>
              </>
            ) : (
              <>
                <Section title="Ley 1581 de 2012 — Protección de Datos" text="Vívelo cumple con la legislación colombiana de protección de datos personales en su totalidad." />
                <Section title="Datos Recolectados" text="Nombre completo, email, teléfono, comprobantes de pago e historial de reservas." />
                <Section title="Tus Derechos" text="Puedes solicitar conocer, actualizar, rectificar o revocar el uso de tus datos en cualquier momento escribiendo a datos@vivelo.co." />
                <Section title="Retención de Datos" text="Los datos se conservan por 5 años desde la eliminación de la cuenta, en cumplimiento de obligaciones fiscales colombianas." />
                <Section title="Transferencia a Terceros" text="Tus datos no se venden. Solo se comparten con proveedores necesarios para completar tu reserva." />
                <p className="text-xs text-gray-500 pt-2">Delegado de Protección: datos@vivelo.co</p>
              </>
            )}
          </div>
          <div className="p-6 pt-0">
            <button onClick={() => setShowLegalModal(null)} className="w-full btn-primary">✓ Entendido</button>
          </div>
        </div>
      </div>
    );
  };

  // AUTH FLOW
  if (authStep !== 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-caribbean via-teal-600 to-blue-700 text-white">
        <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center items-center p-6">
          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur">
              <span className="text-4xl font-bold text-yellow">V</span>
            </div>
            <h1 className="text-4xl font-bold">Vívelo</h1>
            <p className="text-sm opacity-75 mt-1">Experiencias Caribeñas de Colombia</p>
          </div>

          {/* Step indicator */}
          {authStep !== 'welcome' && (
            <div className="flex gap-2 mb-8">
              {['email','verify','legal','notifications'].map((s, i) => (
                <div key={s} className={`h-1.5 w-8 rounded-full transition-all ${['email','verify','legal','notifications'].indexOf(authStep) >= i ? 'bg-yellow' : 'bg-white bg-opacity-30'}`} />
              ))}
            </div>
          )}

          <div className="w-full space-y-4">
            {authStep === 'welcome' && (
              <div className="space-y-6 text-center">
                <p className="text-lg opacity-90">Las mejores experiencias del Caribe colombiano en un solo lugar</p>
                <div className="grid grid-cols-3 gap-3 text-center py-4">
                  {['🚤 Jetski','🤿 Buceo','🪂 Vuelo','🏖️ Resorts','🥾 Tours','🎥 Flyview'].map(e => (
                    <div key={e} className="bg-white bg-opacity-15 rounded-xl p-3 text-sm backdrop-blur">{e}</div>
                  ))}
                </div>
                <button onClick={() => setAuthStep('email')} className="w-full py-4 bg-yellow text-caribbean font-bold rounded-xl text-lg hover:bg-orange hover:text-white transition-all shadow-lg">
                  Comenzar — Es Gratis <ChevronRight size={20} className="inline" />
                </button>
                <p className="text-xs opacity-60">¿Ya tienes cuenta? <button onClick={() => setAuthStep('email')} className="underline">Inicia sesión</button></p>
              </div>
            )}

            {authStep === 'email' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center mb-6">Crea tu cuenta</h2>
                <input type="text" placeholder="Tu nombre completo" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-4 rounded-xl text-caribbean bg-white text-base" />
                <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-4 rounded-xl text-caribbean bg-white text-base" />
                <button onClick={() => { if(email && name){ sendCode(email); setAuthStep('verify'); }}} className="w-full py-4 bg-yellow text-caribbean font-bold rounded-xl hover:bg-orange hover:text-white transition-all">
                  Enviar código de verificación
                </button>
              </div>
            )}

            {authStep === 'verify' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center mb-2">Verifica tu email</h2>
                <p className="text-center text-sm opacity-80 mb-6">Hemos enviado un código de 6 dígitos a<br /><strong>{email}</strong></p>
                <input
                  type="number"
                  placeholder="· · · · · ·"
                  value={verifyCode}
                  onChange={(e) => { setVerifyCode(e.target.value.slice(0, 6)); setVerifyError(false); }}
                  className={`w-full px-4 py-5 rounded-xl text-caribbean bg-white text-center text-3xl tracking-widest font-mono border-4 ${verifyError ? 'border-red-400' : 'border-transparent'}`}
                />
                {verifyError && <p className="text-red-300 text-sm text-center">⚠️ Código inválido. Ingresa los 6 dígitos.</p>}
                <button onClick={handleVerify} className="w-full py-4 bg-yellow text-caribbean font-bold rounded-xl hover:bg-orange hover:text-white transition-all">
                  Verificar
                </button>
                <button onClick={() => {}} className="w-full text-sm opacity-70 text-center py-2 underline">Reenviar código</button>
              </div>
            )}

            {authStep === 'legal' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center mb-6">Términos legales</h2>
                <div className="bg-white text-caribbean p-5 rounded-xl space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-1 w-5 h-5 accent-orange flex-shrink-0" />
                    <span className="text-sm">He leído y acepto los <button onClick={() => setShowLegalModal('terms')} className="text-orange font-bold underline">Términos y Condiciones</button> de Vívelo</span>
                  </label>
                  <div className="border-t pt-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={acceptHabeas} onChange={(e) => setAcceptHabeas(e.target.checked)} className="mt-1 w-5 h-5 accent-orange flex-shrink-0" />
                      <span className="text-sm">Autorizo el tratamiento de mis datos según la <button onClick={() => setShowLegalModal('habeas')} className="text-orange font-bold underline">Política de Habeas Data</button> (Ley 1581/2012)</span>
                    </label>
                  </div>
                </div>
                <button onClick={() => setAuthStep('notifications')} disabled={!acceptTerms || !acceptHabeas} className="w-full py-4 bg-yellow text-caribbean font-bold rounded-xl hover:bg-orange hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                  Continuar
                </button>
              </div>
            )}

            {authStep === 'notifications' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center mb-2">Notificaciones</h2>
                <p className="text-center text-sm opacity-80 mb-6">Elige cómo quieres recibir tus confirmaciones</p>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer bg-white bg-opacity-15 p-4 rounded-xl backdrop-blur">
                    <div className="flex items-center gap-3">
                      <Bell size={20} />
                      <div>
                        <p className="font-semibold text-sm">Notificaciones Push</p>
                        <p className="text-xs opacity-70">Confirmaciones y recordatorios</p>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-all ${notifPush ? 'bg-yellow' : 'bg-white bg-opacity-30'} relative`} onClick={() => setNotifPush(!notifPush)}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${notifPush ? 'left-6' : 'left-0.5'}`} />
                    </div>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer bg-white bg-opacity-15 p-4 rounded-xl backdrop-blur">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📧</span>
                      <div>
                        <p className="font-semibold text-sm">Emails de marketing</p>
                        <p className="text-xs opacity-70">Máximo 2 por mes, ofertas exclusivas</p>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-all ${notifMkt ? 'bg-yellow' : 'bg-white bg-opacity-30'} relative cursor-pointer`} onClick={() => setNotifMkt(!notifMkt)}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${notifMkt ? 'left-6' : 'left-0.5'}`} />
                    </div>
                  </label>
                </div>
                <button onClick={() => setAuthStep('completed')} className="w-full py-4 bg-yellow text-caribbean font-bold rounded-xl hover:bg-orange hover:text-white transition-all mt-4">
                  ¡Listo, Empecemos! 🚀
                </button>
              </div>
            )}
          </div>
        </div>
        {renderLegalModal()}
      </div>
    );
  }

  // MAIN APP
  const isAdmin = email === 'leonardo@flyview23.com' || email === 'admin@vivelo.co';

  return (
    <div className="min-h-screen bg-cream text-caribbean">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-caribbean rounded-full flex items-center justify-center">
              <span className="text-yellow font-bold text-sm">V</span>
            </div>
            <h1 className="text-xl font-bold text-caribbean">Vívelo</h1>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden md:flex gap-6 items-center">
            {[['home','Inicio',<Home size={18}/>],['flyview23','Flyview23',<Video size={18}/>]].map(([view, label, icon]) => (
              <button key={view} onClick={() => setCurrentView(view)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${currentView === view ? 'text-orange font-bold bg-orange bg-opacity-10' : 'hover:text-orange'}`}>
                {icon} {label}
              </button>
            ))}
            {isAdmin && (
              <button onClick={() => setCurrentView('admin')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition border-2 ${currentView === 'admin' ? 'bg-red-500 text-white border-red-500' : 'text-red-500 border-red-500 hover:bg-red-500 hover:text-white'}`}>
                <Lock size={18} /> ADMIN
              </button>
            )}
            <div className="w-8 h-8 bg-caribbean rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer">
              {name ? name[0].toUpperCase() : 'U'}
            </div>
          </nav>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white px-4 py-3 space-y-1">
            {[['home','Inicio'],['flyview23','Flyview23']].map(([view, label]) => (
              <button key={view} onClick={() => { setCurrentView(view); setMobileMenuOpen(false); }} className={`block w-full text-left px-3 py-3 rounded-lg ${currentView === view ? 'bg-orange bg-opacity-10 text-orange font-bold' : ''}`}>{label}</button>
            ))}
            {isAdmin && (
              <button onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-red-500 font-bold">🔒 ADMIN</button>
            )}
          </div>
        )}
      </header>

      {/* HOME VIEW */}
      {currentView === 'home' && (
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="relative bg-gradient-to-br from-caribbean to-teal-700 text-white py-16 px-4 overflow-hidden">
            <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
              <path d="M0,40 Q360,80 720,40 T1440,40 L1440,80 L0,80 Z" fill="#FFF8F0" />
            </svg>
            <div className="relative text-center max-w-2xl mx-auto">
              <p className="text-yellow font-semibold text-sm mb-2 tracking-widest uppercase">🇨🇴 Colombia Caribeña</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Vive lo Extraordinario</h2>
              <p className="text-lg opacity-85 mb-8">Las mejores experiencias caribeñas, alojamientos y servicios en un solo lugar</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {['⚡ Esta semana','🌊 Frente al mar','🏷️ En oferta','⚡ Disponibilidad inmediata'].map(f => (
                  <button key={f} className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur rounded-full text-sm hover:bg-white hover:text-caribbean transition font-medium">{f}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Experiencias */}
          <div className="px-4 py-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">🏄 Experiencias Populares</h3>
              <button className="text-orange text-sm font-semibold hover:underline">Ver todas →</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {experiencias.map(e => (
                <div key={e.id} onClick={() => { setSelectedExperience(e); setCurrentView('payment'); setPaymentConfirmed(false); }} className="card p-5 cursor-pointer hover:scale-105 transition-all hover:shadow-2xl group">
                  <div className="text-5xl mb-3">{e.image}</div>
                  <h4 className="font-bold mb-1 group-hover:text-orange transition">{e.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">{e.desc}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-orange font-bold text-lg">${(e.price/1000).toFixed(0)}K COP</p>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Star size={12} className="fill-yellow text-yellow" />{e.rating} <span className="text-gray-400">({e.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <MapPin size={11} />{e.location}
                  </div>
                  <button className="mt-4 w-full py-2 bg-caribbean text-white rounded-lg text-sm font-semibold hover:bg-orange transition">Reservar ahora</button>
                </div>
              ))}
            </div>
          </div>

          {/* Alojamientos */}
          <div className="px-4 py-10 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">🏨 Alojamientos Destacados</h3>
              <button className="text-orange text-sm font-semibold hover:underline">Ver todos →</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {alojamientos.map(a => (
                <div key={a.id} onClick={() => { setSelectedExperience(a); setCurrentView('payment'); setPaymentConfirmed(false); }} className="card p-5 cursor-pointer hover:scale-105 transition-all hover:shadow-2xl group">
                  <div className="text-5xl mb-3">{a.image}</div>
                  <h4 className="font-bold mb-1 group-hover:text-orange transition">{a.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">{a.desc}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-orange font-bold">${(a.price/1000).toFixed(0)}K/noche</p>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Star size={12} className="fill-yellow text-yellow" />{a.rating}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <MapPin size={11} />{a.location}
                  </div>
                  <button className="mt-4 w-full py-2 bg-caribbean text-white rounded-lg text-sm font-semibold hover:bg-orange transition">Reservar ahora</button>
                </div>
              ))}
            </div>
          </div>

          {/* Flyview CTA */}
          <div className="mx-4 my-10 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-yellow font-bold text-sm mb-1">📸 POWERED BY FLYVIEW23</p>
                <h3 className="text-2xl font-bold mb-2">Captura tu experiencia en 4K</h3>
                <p className="text-gray-400">Drones profesionales, fotos y videos cinematográficos de tus mejores momentos</p>
              </div>
              <button onClick={() => setCurrentView('flyview23')} className="flex-shrink-0 px-6 py-3 bg-yellow text-caribbean font-bold rounded-xl hover:bg-orange hover:text-white transition">
                Ver Galería →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLYVIEW23 */}
      {currentView === 'flyview23' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white p-8 rounded-2xl mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow rounded-lg flex items-center justify-center font-bold text-caribbean text-lg">F</div>
              <div>
                <h2 className="text-3xl font-bold">Flyview23</h2>
                <p className="text-yellow text-sm">Producción Audiovisual Profesional</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">Tus videos y fotos profesionales, disponibles para descargar</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white bg-opacity-10 p-4 rounded-xl"><p className="text-3xl font-bold">{flyview23Videos.length}</p><p className="text-sm text-gray-400">Videos</p></div>
              <div className="bg-white bg-opacity-10 p-4 rounded-xl"><p className="text-3xl font-bold">7.3GB</p><p className="text-sm text-gray-400">Total</p></div>
              <div className="bg-white bg-opacity-10 p-4 rounded-xl"><p className="text-3xl font-bold text-yellow">4K</p><p className="text-sm text-gray-400">Calidad</p></div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {flyview23Videos.map(v => (
              <div key={v.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 items-center shadow-sm hover:shadow-md transition">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${v.status === 'ready' ? 'bg-green-100' : 'bg-yellow bg-opacity-20'}`}>
                  {v.status === 'ready' ? '▶️' : '⏳'}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-caribbean">{v.title}</h4>
                  <div className="flex gap-3 text-xs text-gray-500 mt-1">
                    <span><Clock size={11} className="inline mr-1" />{v.duration}</span>
                    <span>{v.size}</span>
                    <span className="text-yellow font-bold">{v.quality}</span>
                  </div>
                  {v.status === 'processing' && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Procesando...</span><span>{v.progress}%</span></div>
                      <div className="bg-gray-200 rounded-full h-2 w-full">
                        <div className="bg-orange h-2 rounded-full transition-all" style={{ width: `${v.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
                {v.status === 'ready' && (
                  <div className="flex gap-2">
                    <button className="p-3 bg-caribbean text-white rounded-xl hover:bg-orange transition"><Play size={18} /></button>
                    <button className="p-3 border-2 border-caribbean text-caribbean rounded-xl hover:bg-caribbean hover:text-white transition"><Download size={18} /></button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange to-yellow p-8 rounded-2xl text-caribbean text-center">
            <p className="text-3xl mb-2">📚</p>
            <h3 className="text-2xl font-bold mb-2">Photobook Impreso Premium</h3>
            <p className="mb-2 opacity-80">Álbum de fotos profesional de tu experiencia • Envío a toda Colombia</p>
            <p className="text-3xl font-bold mb-4">$89.000 COP</p>
            <button className="px-8 py-3 bg-caribbean text-white font-bold rounded-xl hover:bg-opacity-80 transition">Solicitar mi Photobook</button>
          </div>
        </div>
      )}

      {/* PAYMENT VIEW */}
      {currentView === 'payment' && (
        <div className="max-w-lg mx-auto px-4 py-8">
          <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 text-gray-500 hover:text-caribbean mb-6 text-sm">
            ← Volver
          </button>

          {!paymentConfirmed ? (
            <>
              {/* Resumen */}
              <div className="bg-gradient-to-r from-caribbean to-teal-700 text-white p-6 rounded-2xl mb-6">
                <p className="text-yellow font-bold text-sm mb-1">TU RESERVA</p>
                <h3 className="text-xl font-bold mb-4">{reservationItem.title}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="opacity-70">Fecha</p><p className="font-bold">2026-05-10</p></div>
                  <div><p className="opacity-70">Personas</p><p className="font-bold">2</p></div>
                  <div><p className="opacity-70">Precio/persona</p><p className="font-bold">${reservationItem.price.toLocaleString()} COP</p></div>
                  <div><p className="opacity-70">Total</p><p className="font-bold text-yellow text-xl">${totalPrice.toLocaleString()} COP</p></div>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4">Selecciona método de pago</h2>
              <div className="space-y-3 mb-6">
                {[
                  { id: 'bold', icon: <CreditCard size={24} />, name: 'Bold — Tarjeta / PSE', desc: 'Pago inmediato 100% seguro', badge: '🔒 Recomendado' },
                  { id: 'nequi', icon: <Smartphone size={24} />, name: 'Nequi', desc: 'Transferir a Carmen López • 3054386395', badge: null },
                  { id: 'bancolombia', icon: <Building2 size={24} />, name: 'Bancolombia', desc: 'Cuenta 76941652120 • Leonardo Doria', badge: null },
                ].map(m => (
                  <div key={m.id} onClick={() => setSelectedPaymentMethod(m.id)} className={`p-4 border-2 rounded-xl cursor-pointer transition ${selectedPaymentMethod === m.id ? 'border-orange bg-orange bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${selectedPaymentMethod === m.id ? 'bg-orange text-white' : 'bg-gray-100 text-gray-600'}`}>{m.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm">{m.name}</h3>
                          {m.badge && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{m.badge}</span>}
                        </div>
                        <p className="text-xs text-gray-500">{m.desc}</p>
                      </div>
                      {selectedPaymentMethod === m.id && <Check className="text-orange flex-shrink-0" size={20} />}
                    </div>
                  </div>
                ))}
              </div>

              {selectedPaymentMethod === 'bold' && (
                <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl mb-4">
                  <div className="flex items-center gap-2 mb-3"><Shield size={16} className="text-blue-600" /><p className="font-bold text-blue-800 text-sm">Pago seguro con Bold</p></div>
                  <p className="text-sm text-blue-700 mb-4">Serás redirigido a la plataforma de pagos Bold para completar tu transacción de forma segura.</p>
                  <button onClick={() => setPaymentConfirmed(true)} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">
                    Pagar ${totalPrice.toLocaleString()} COP con Bold →
                  </button>
                </div>
              )}

              {(selectedPaymentMethod === 'nequi' || selectedPaymentMethod === 'bancolombia') && (
                <div className="space-y-4 mb-4">
                  <div className="bg-yellow bg-opacity-20 border border-yellow p-4 rounded-xl">
                    <p className="font-bold text-sm mb-1">📋 Instrucciones</p>
                    <p className="text-xs text-gray-700">{selectedPaymentMethod === 'nequi' ? 'Transfiere $' + totalPrice.toLocaleString() + ' a Nequi • Carmen López • 305 438 6395' : 'Transfiere $' + totalPrice.toLocaleString() + ' a Bancolombia • Cta. 76941652120 • Leonardo Doria'}</p>
                  </div>
                  <input type="text" placeholder="N° de referencia / confirmación" value={referencia} onChange={e => setReferencia(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange outline-none text-sm" />
                  <div>
                    <label className="block text-sm font-bold mb-2">Comprobante de pago (foto, máx 5MB)</label>
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${uploadedFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-orange'}`}>
                      <input type="file" accept="image/*" onChange={(e) => setUploadedFile(e.target.files?.[0]?.name)} className="hidden" id="fileupload" />
                      <label htmlFor="fileupload" className="cursor-pointer">
                        {uploadedFile ? (
                          <div className="text-green-600"><CheckCircle size={32} className="mx-auto mb-2" /><p className="font-semibold text-sm">{uploadedFile}</p></div>
                        ) : (
                          <div className="text-gray-500"><div className="text-3xl mb-2">📎</div><p className="text-sm">Toca para subir foto del comprobante</p></div>
                        )}
                      </label>
                    </div>
                  </div>
                  <button onClick={() => { if(referencia && uploadedFile) setPaymentConfirmed(true); }} disabled={!referencia || !uploadedFile} className="w-full py-3 bg-orange text-white font-bold rounded-xl hover:bg-caribbean transition disabled:opacity-40 disabled:cursor-not-allowed">
                    Confirmar pago →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-caribbean mb-2">¡Reserva Confirmada!</h2>
              <p className="text-gray-600 mb-6">Recibirás confirmación a <strong>{email}</strong> en los próximos 2 minutos</p>
              <div className="bg-caribbean text-white p-6 rounded-2xl mb-6">
                <p className="text-yellow font-bold text-sm mb-1">CÓDIGO DE CONFIRMACIÓN</p>
                <p className="text-3xl font-mono font-bold">{confCode}</p>
                <p className="text-sm opacity-70 mt-2">{reservationItem.title}</p>
                <p className="text-sm opacity-70">2 personas • 2026-05-10</p>
              </div>
              <button onClick={() => setCurrentView('flyview23')} className="w-full py-3 bg-yellow text-caribbean font-bold rounded-xl hover:bg-orange hover:text-white transition mb-3">
                Ver galería Flyview23 📹
              </button>
              <button onClick={() => { setCurrentView('home'); setPaymentConfirmed(false); }} className="w-full py-3 border-2 border-caribbean text-caribbean font-bold rounded-xl hover:bg-caribbean hover:text-white transition">
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      )}

      {/* ADMIN PANEL */}
      {currentView === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center"><Lock size={20} className="text-white" /></div>
            <div>
              <h2 className="text-2xl font-bold text-red-600">Panel de Administrador</h2>
              <p className="text-sm text-gray-500">Acceso restringido — {email}</p>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Pendientes', value: adminStats.pendientes, color: 'red', icon: <AlertTriangle size={20} /> },
              { label: 'Aprobados Hoy', value: `${adminStats.aprobadosHoy} ↑15%`, color: 'green', icon: <CheckCircle size={20} /> },
              { label: 'Reservas/Mes', value: `${adminStats.reservasMes} ↑22%`, color: 'blue', icon: <TrendingUp size={20} /> },
              { label: 'Ingresos', value: `$${(adminStats.ingresos/1000000).toFixed(1)}M ↑18%`, color: 'yellow', icon: <DollarSign size={20} /> },
              { label: 'Proveedores', value: adminStats.proveedores, color: 'purple', icon: <Package size={20} /> },
              { label: 'Usuarios', value: adminStats.usuarios.toLocaleString(), color: 'pink', icon: <Users size={20} /> },
            ].map(({ label, value, color, icon }) => (
              <div key={label} className={`bg-${color}-50 border border-${color}-100 p-4 rounded-xl`}>
                <div className={`text-${color}-500 mb-2`}>{icon}</div>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            {['solicitudes','reservas','pagos','usuarios'].map(t => (
              <button key={t} onClick={() => setAdminTab(t)} className={`px-4 py-2 text-sm font-semibold capitalize transition border-b-2 -mb-px ${adminTab === t ? 'border-orange text-orange' : 'border-transparent text-gray-500 hover:text-caribbean'}`}>
                {t}
              </button>
            ))}
          </div>

          {adminTab === 'solicitudes' && (
            <div className="space-y-4">
              {adminRequests.map(req => (
                <div key={req.id} className={`p-5 border-2 rounded-xl transition ${req.status === 'verified' || req.status === 'approved' ? 'border-green-200 bg-green-50' : req.status === 'rejected' ? 'border-red-200 bg-red-50' : 'border-orange bg-white'}`}>
                  <div className="flex gap-4 items-start">
                    <span className="text-4xl">{req.image}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold">{req.name}</h4>
                        {(req.status === 'verified' || req.status === 'approved') && <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full font-bold">✓ Aprobado</span>}
                        {req.status === 'rejected' && <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full font-bold">✗ Rechazado</span>}
                        {req.status === 'pending' && <span className="text-xs bg-orange bg-opacity-20 text-orange px-2 py-0.5 rounded-full font-bold">⏳ Pendiente</span>}
                      </div>
                      <p className="text-sm text-gray-600">{req.type} • {req.city} • {req.docs} documentos • {req.time}</p>
                    </div>
                    {req.status === 'pending' && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => handleAdminAction(req.id, 'rejected')} className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"><XCircle size={14} /> Rechazar</button>
                        <button onClick={() => handleAdminAction(req.id, 'approved')} className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"><CheckCircle size={14} /> Aprobar</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {adminTab !== 'solicitudes' && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">📊</div>
              <p className="text-lg font-semibold">Sección en desarrollo</p>
              <p className="text-sm">Próximamente con datos en tiempo real</p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-caribbean text-white mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center font-bold text-caribbean text-sm">V</div>
                <h3 className="font-bold text-xl">Vívelo</h3>
              </div>
              <p className="text-sm opacity-70">Las mejores experiencias del Caribe colombiano</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-yellow">Legal</h4>
              <div className="space-y-1 text-sm opacity-70">
                <p>legal@vivelo.co</p>
                <p>datos@vivelo.co</p>
                <p>Ley 1581/2012 Colombia</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-yellow">Flyview23</h4>
              <p className="text-sm opacity-70">Producción audiovisual profesional para turismo y experiencias</p>
            </div>
          </div>
          <div className="border-t border-white border-opacity-20 pt-6 text-center text-sm opacity-60">
            © 2026 Vívelo SAS • Santa Marta, Colombia • Todos los derechos reservados
          </div>
        </div>
      </footer>

      {renderLegalModal()}
    </div>
  );
};

const Section = ({ title, text }) => (
  <div>
    <h3 className="font-bold text-caribbean mb-1 text-sm">{title}</h3>
    <p className="text-gray-600 text-xs leading-relaxed">{text}</p>
  </div>
);

export default Vivelo_v5;
