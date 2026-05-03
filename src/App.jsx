import React, { useState } from 'react';
import './styles/App.css';

// Logo SVG de Vívelo
const VivoloLogo = () => (
  <svg viewBox="0 0 200 60" className="vivelo-logo">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#FF8C42', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#0A4A52', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <text x="10" y="45" fontSize="40" fontWeight="bold" fill="url(#grad1)" fontFamily="Arial, sans-serif">
      Vívelo23
    </text>
  </svg>
);

// Landing Page
const Landing = ({ onGetStarted }) => (
  <div className="landing">
    <header className="header">
      <VivoloLogo />
      <button className="btn-login">Ingresar</button>
    </header>
    
    <section className="hero">
      <h1>Vive experiencias inolvidables en el Caribe</h1>
      <p>Descubre alojamientos exclusivos, tours épicos y servicios de lujo</p>
      <button className="btn-primary" onClick={onGetStarted}>
        Explorar ahora
      </button>
    </section>

    <section className="features">
      <div className="feature">
        <div className="icon">🏖️</div>
        <h3>Alojamientos únicos</h3>
        <p>Villas, hoteles boutique y casas con vista al mar</p>
      </div>
      <div className="feature">
        <div className="icon">🚁</div>
        <h3>Flyview23 Drone</h3>
        <p>Videos 4K de tus experiencias</p>
      </div>
      <div className="feature">
        <div className="icon">⛵</div>
        <h3>Experiencias extremas</h3>
        <p>Jetski, paracaidismo, buceo</p>
      </div>
    </section>

    <section className="cta">
      <h2>Descarga la app y obtén 15% de descuento</h2>
      <p>Acceso exclusivo a ofertas solo en app</p>
      <div className="download-buttons">
        <button className="btn-app">📱 App Store</button>
        <button className="btn-app">🤖 Google Play</button>
      </div>
    </section>
  </div>
);

// Auth Component
const Auth = ({ onAuthComplete }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthComplete({ ...formData, authenticated: true });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <VivoloLogo />
        <h2>{isLogin ? 'Ingresar' : 'Crear cuenta'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit" className="btn-primary">
            {isLogin ? 'Ingresar' : 'Crear cuenta'}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button onClick={() => setIsLogin(!isLogin)} className="link-btn">
            {isLogin ? 'Regístrate' : 'Ingresar'}
          </button>
        </p>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [screen, setScreen] = useState('landing');
  const [user, setUser] = useState(null);

  const handleGetStarted = () => {
    setScreen('auth');
  };

  const handleAuthComplete = (userData) => {
    setUser(userData);
    setScreen('dashboard');
  };

  if (screen === 'landing') {
    return <Landing onGetStarted={handleGetStarted} />;
  }

  if (screen === 'auth') {
    return <Auth onAuthComplete={handleAuthComplete} />;
  }

  return (
    <div className="dashboard">
      <h1>¡Bienvenido, {user?.name || user?.email}!</h1>
      <p>Vívelo 2.0 - Coming Soon</p>
    </div>
  );
}
