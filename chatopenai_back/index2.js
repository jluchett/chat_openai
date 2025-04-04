const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Para manejar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de la API de DeepSeek
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'tu_api_key_aquí'; // Usa variables de entorno
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Endpoint para enviar mensajes a DeepSeek
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "El mensaje es requerido." });
        }

        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                model: "deepseek-chat",
                messages: [{ role: "user", content: message }],
            },
            {
                headers: {
                    "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error("Error al llamar a la API de DeepSeek:", error);
        res.status(500).json({ error: "Error al procesar tu mensaje." });
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor de DeepSeek Chat funcionando! 🚀');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});