import React from 'react';
import { NavLink } from 'react-router-dom';
// (Importa el CSS)
import '../../styles/components/layout/Nav.css';

// CORRECCIÓN: Ya no recibe 'user' ni 'onLogout'
const Nav = (props) => {

  // CORRECCIÓN: Se eliminó la lógica de 'useNavigate' y 'handleLogout'

  return (
    <nav>
      <div className="holder">
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'activo' : ''}>Home</NavLink></li>
          <li><NavLink to="/nosotros" className={({ isActive }) => isActive ? 'activo' : ''}>Nosotros</NavLink></li>
          <li><NavLink to="/novedades" className={({ isActive }) => isActive ? 'activo' : ''}>Novedades</NavLink></li>
          <li><NavLink to="/contacto" className={({ isActive }) => isActive ? 'activo' : ''}>Contacto</NavLink></li>
          
          {/* CORRECCIÓN: Se eliminó el <li> de Login/Logout */}
          
        </ul>
      </div>
    </nav>
  );
}

export default Nav;