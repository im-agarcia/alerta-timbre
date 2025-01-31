import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !phone) {
            setMessage('Por favor, ingresa tu nombre y teléfono.');
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
            setName(''); // Limpia el campo de nombre
            setPhone(''); // Limpia el campo de teléfono
        } catch (error) {
            setMessage('Error al enviar el mensaje.'); // Muestra el mensaje de error
            console.error(error);
        }
    };

    return (
        <div className="App">
            <h1>Hola! compartime info para responderte</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder='Tu nombre'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                    placeholder='Tu celu'
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;