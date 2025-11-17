import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes
import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';

// Páginas
import HomePage from './pages/HomePage';
import NosotrosPage from './pages/NosotrosPage';
import NovedadesPage from './pages/NovedadesPage';
import ContactoPage from './pages/ContactoPage';
import LoginPage from './pages/LoginPage';

// --- ¡Ruta Corregida! ---
// App.css está en la misma carpeta (src), no en /styles
import './App.css'; 

function App() {

  const [user, setUser] = useState(null); 

  return (
    <div className="App">
      
      <Header user={user} /> 

      <BrowserRouter>
        <Nav user={user} onLogout={setUser} /> 
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} /> 
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;