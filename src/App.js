import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Button } from '@mui/material'; // Importamos componentes de Material-UI
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga
    const [isSubmitted, setIsSubmitted] = useState(false); // Estado para controlar si se envió el formulario

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert('Sin nombre no se puede');
            return;
        }

        setIsLoading(true); // Activa el estado de carga

        try {
            const response = await axios.post(
                'https://backend-timbre.onrender.com/send-to-line', // URL de tu backend en Render
                {
                    name,
                    phone,
                }
            );

            // Si la solicitud es exitosa, cambia el estado a "enviado"
            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
            alert('Error al enviar el mensaje.'); // Muestra un mensaje de error en caso de fallo
        } finally {
            setIsLoading(false); // Desactiva el estado de carga
        }
    };

    const handleReset = () => {
        setIsSubmitted(false); // Vuelve al estado inicial para permitir un nuevo ingreso de datos
        setName('');
        setPhone('');
    };

    return (
        <div className="App">
            <h1>Hola! El timbre no funciona, compartime info para atenderte</h1>

            {!isSubmitted ? (
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
                                if (/^\d*$/.test(value)) {
                                    setPhone(value);
                                }
                            }}
                            inputMode="numeric"
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CircularProgress size={24} style={{ marginRight: '8px' }} />
                                Timbreando...
                            </div>
                        ) : (
                            'Enviar'
                        )}
                    </button>
                </form>
            ) : (
                <div>
                    <p style={{ fontSize: '24px', color: 'green', fontWeight: 'bold' }}>
                        Ya estamos informados que estás en la puerta, aguardanos unos minutos que te llamamos o bajamos.
                    </p>
                    <Button variant="contained" color="primary" onClick={handleReset}>
                        Anunciarme de nuevo
                    </Button>
                </div>
            )}
        </div>
    );
}

export default App;