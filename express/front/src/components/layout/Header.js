import React from 'react';
import '../../styles/components/layout/Header.css'; // Ruta de CSS

const Header = ({ user }) => { 
  return (
    <header>
      <div className="holder">
        
        {/* CORRECCIÓN: Se quitó el width="150" */}
        <img src="/images/logo.png" alt="Gaming Store" />

        <h1>Gaming Store</h1>
        
        {user && (
          // CORRECCIÓN: Se movió el 'style' al CSS
          <div className="usuario-info"> 
            Hola, <strong>{user.nombre}</strong>
            {user.rol === 'admin' ? ' (Admin)' : ''}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;