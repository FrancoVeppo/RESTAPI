import React, { useState } from 'react';
import axios from 'axios';
// --- ¡Ruta Corregida! ---
import '../styles/components/pages/ContactoPage.css';

const ContactoPage = (props) => {
  const initialForm = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  };
  
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState('');
  // --- NUEVO ---: Estado para saber si el mensaje es un error o de éxito
  const [isError, setIsError] = useState(false); 
  
  const [formData, setFormData] = useState(initialForm);

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
    setIsError(false); // --- NUEVO ---
    setSending(true);
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/contacto`, formData);
      setSending(false);
      setMsg(response.data.message); // Mensaje de la API
      setIsError(false); // --- NUEVO ---: Es un mensaje de éxito

      if (response.data.error === false) {
        setFormData(initialForm);
      }
    } catch (error) {
      setSending(false);
      setMsg('Ocurrió un error, intente nuevamente.'); // Mensaje de error
      setIsError(true); // --- NUEVO ---: Es un mensaje de error
      console.log(error);
    }
  };

  return (
    <main className="holder contacto">
      
      {/* --- Columna del Formulario (Inputs mejorados) --- */}
      <div>
        <h2>Formulario de Contacto</h2>
        <form className="formulario" onSubmit={handleSubmit}>
          <p>
            <label>
              Nombre
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                required 
              />
            </label>
          </p>
          <p>
            <label>
              Email
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required
              />
            </label>
          </p>
          <p>
            <label>
              Teléfono (Opcional)
              <input 
                type="text" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleChange} 
              />
            </label>
          </p>
          <p>
            <label>
              Mensaje
              <textarea 
                name="mensaje" 
                value={formData.mensaje} 
                onChange={handleChange}
                required
              ></textarea>
            </label>
          </p>
          
          {/* --- NUEVO: Feedback de mensajes con clases CSS --- */}
          <div className="feedback-container">
            {sending && <p className="msg-sending">Enviando...</p>}
            {msg && (
              <p className={isError ? 'msg-error' : 'msg-success'}>{msg}</p>
            )}
          </div>
          
          <p className="centrar">
            <input type="submit" value="Enviar Consulta" className="btn-enviar" />
          </p>
        </form>
      </div>

      {/* --- Columna de "Otras Vías" (con Iconos) --- */}
      <div className="datos">
        <h2>Otras vías de comunicación</h2>
        <p>Contacta con nosotros directamente a través de estos canales:</p>
        <ul className="info-list">
          <li>
            <i className="fas fa-phone"></i> 4321-1234
          </li>
          <li>
            <i className="fas fa-envelope"></i> contacto@gamingstore.com.ar
          </li>
          <li>
            <i className="fab fa-discord"></i> /GamingStoreDiscord
          </li>
          <li>
            <i className="fab fa-instagram"></i> @GamingStoreArg
          </li>
        </ul>
      </div>
    </main>
  );
}

export default ContactoPage;