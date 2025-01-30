import React, { useState } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí llamarás a la función que envía el mensaje usando la API de LINE
    await enviarMensajeALine(nombre, telefono);
  };

  const enviarMensajeALine = async (nombre, telefono) => {
    const LINE_CHANNEL_ACCESS_TOKEN = 'gD89Y/amOIrK1kbSq9kH/Nqp6xmd0RP5kwXo88PFat2HjYEceSquCyAgT1GJWpAjo5U38TNCN3fZ7Qz1hpRKBMKchJdN3ciDnYMBBZr4ZKwF4h9FwnPwINej/r7bPP79Z+TKq8UzorPWIW/WGnRW/gdB04t89/1O/w1cDnyilFU=';
    const USER_ID_1 = 'im.kokuyo';
  
    const mensaje = `Nuevo mensaje de ${nombre} - Teléfono: ${telefono}`;
  
    try {
      const response1 = await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          to: USER_ID_1,
          messages: [
            {
              type: 'text',
              text: mensaje,
            },
          ],
        }),
      });
  
  
      if (response1.ok) {
        alert('Mensaje enviado correctamente');
      } else {
        alert('Hubo un error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el mensaje');
    }
  };

  return (
    <div>
      <h1>Enviar Mensaje a LINE</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;