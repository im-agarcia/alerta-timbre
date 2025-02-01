import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false); // Estado para controlar la visibilidad del mensaje

    // Efecto para ocultar el mensaje después de 2 segundos
    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false);
                setMessage(''); // Limpia el mensaje después de ocultarlo
            }, 2000); // 2 segundos

            return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
        }
    }, [showMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();


         if (!name) {
            setMessage('Sin nombre no se puede');
            setShowMessage(true); // Muestra el mensaje
            return;
        } 

        try {
            const response = await axios.post(
                'https://backend-timbre.onrender.com/send-to-line', // URL de tu backend en Render
                {
                    name,
                    phone,
                }
            );

            setMessage(response.data.message); // Muestra el mensaje de éxito
            setShowMessage(true); // Muestra el mensaje
            setName(''); // Limpia el campo de nombre
            setPhone(''); // Limpia el campo de teléfono
        } catch (error) {
            setMessage('Error al enviar el mensaje.'); // Muestra el mensaje de error
            setShowMessage(true); // Muestra el mensaje
            console.error(error);
        }
    };

    return (
        <div className="App">
            <h1>Hola! El timbre no funciona, compartime info para atenderte</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="Tu nombre"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                <input
                  placeholder="Tu celu"
                  type="text"
                  value={phone}
                  onChange={(e) => {
                      const value = e.target.value;
                      // Solo permite números
                      if (/^\d*$/.test(value)) {
                          setPhone(value);
                      }
                  }}
                  inputMode="numeric" // Muestra el teclado numérico en dispositivos móviles
                  required
              />
                </div>
                <button type="submit">Enviar</button>
            </form>

            {/* Mensaje emergente */}
            {showMessage && (
                <div className="message-popup">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}

export default App;