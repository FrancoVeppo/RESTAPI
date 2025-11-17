import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/components/pages/ContactoPage.css';

// --- 1. RECIBIR 'onLogin' DE LAS PROPS ---
const LoginPage = ({ onLogin }) => { 
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(oldData => ({
      ...oldData,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setSending(true);
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData, {
        withCredentials: true 
      });

      setSending(false);

      if (response.data.error === false) {
        
        // --- 2. LLAMAR A onLogin Y GUARDAR EL USUARIO ---
        onLogin({
          nombre: response.data.nombre,
          rol: response.data.rol
        });
        
        navigate('/'); // Redirige al Home
      } else {
        setMsg(response.data.message);
      }

    } catch (error) {
      setSending(false);
      setMsg('Ocurrió un error, intente nuevamente.');
      console.log(error);
    }
  };

  return (
    <main className="holder">
      <div className="col-6 offset-3">
        <h2>Iniciar Sesión</h2>
        <form className="formulario" onSubmit={handleSubmit}>
          {/* ... (formulario) ... */}
          <p>
            <label>Usuario</label>
            <input 
              type="text" 
              name="usuario" 
              value={formData.usuario} 
              onChange={handleChange} 
            />
          </p>
          <p>
            <label>Contraseña</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
            />
          </p>
          
          {sending ? <p>Ingresando...</p> : null}
          {msg ? <p style={{color: 'red'}}>{msg}</p> : null}
          
          <p className="centrar">
            <input type="submit" value="Ingresar" />
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;