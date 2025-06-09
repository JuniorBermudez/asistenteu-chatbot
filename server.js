const express = require('express');
const natural = require('natural');
const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.use(express.static('public'));


const knowledgeBase = [
    {
        "intencion": "saludo",
        "patrones": [
            "hola", "qué tal", "buenos días", "buenas tardes", "buenas noches", "saludos",
            "hey", "holita", "qué onda", "cómo estás", "qué hay", "saludar", "un saludo"
        ],
        "respuestas": [
            "¡Hola! Soy el chatbot de soporte técnico de la universidad. ¿En qué puedo ayudarte hoy?",
            "Hola, ¿cómo puedo asistirte?",
            "¡Saludos! Estoy aquí para resolver tus dudas sobre soporte.",
            "Bienvenido/a. ¿Qué necesitas?",
            "¡Hola! Dime en qué puedo ayudarte."
        ]
    },
    {
        "intencion": "despedida",
        "patrones": [
            "adiós", "hasta luego", "chao", "nos vemos", "bye", "me voy", "hasta pronto",
            "fin de la conversación", "me desconecto", "cierra chat"
        ],
        "respuestas": [
            "¡Hasta pronto! Que tengas un buen día.",
            "Adiós, cualquier otra consulta, no dudes en preguntar.",
            "¡Nos vemos! Siempre a tu servicio.",
            "Que tengas un excelente día. ¡Adiós!",
            "Cualquier cosa, aquí estoy. ¡Chao!"
        ]
    },
    {
        "intencion": "agradecimiento",
        "patrones": [
            "gracias", "muchas gracias", "te lo agradezco", "mil gracias", "gracias por tu ayuda",
            "muy amable", "agradecido", "gracias totales"
        ],
        "respuestas": [
            "De nada, estoy para servirte.",
            "Con gusto.",
            "Es un placer ayudarte.",
            "Para eso estoy.",
            "No hay de qué.",
            "Me alegra poder ser útil."
        ]
    },
    {
        "intencion": "olvido_contrasena_correo",
        "patrones": [
            "olvidé mi contraseña del correo", "no puedo entrar al correo institucional", "resetear contraseña email",
            "problemas con el email universitario", "clave del correo", "correo universitario", "olvide mi contraseña",
            "cómo recupero mi contraseña", "mi clave de correo no funciona", "necesito cambiar mi contraseña",
            "resetear clave", "correo no me abre", "problema con mi email", "olvide mi clave"
        ],
        "respuestas": [
            "Para restablecer tu contraseña del correo institucional, por favor, visita el portal de recuperación de contraseñas de la universidad aquí: [https://recuperar-contrasena.universidad.edu].",
            "Puedes restablecer tu contraseña del correo siguiendo los pasos en [https://recuperar-contrasena.universidad.edu]. Si el problema persiste, contacta a soporte técnico en soporte.correo@universidad.edu."
        ]
    },
    {
        "intencion": "problema_moodle",
        "patrones": [
            "no puedo entrar a moodle", "problemas con la plataforma virtual", "moodle no funciona", "error en moodle",
            "plataforma de estudio", "mi campus virtual", "problemas para acceder a moodle", "moodle no carga",
            "tengo un error en el aula virtual", "no me deja entrar a moodle", "problemas con mis cursos en moodle"
        ],
        "respuestas": [
            "Si tienes problemas para acceder a Moodle, verifica tu conexión a internet y que tus credenciales sean correctas. Si el problema persiste, por favor, envía un correo a soporte.moodle@universidad.edu con una descripción detallada de tu problema.",
            "Para problemas con Moodle, intenta limpiar la caché de tu navegador o prueba con otro navegador. Si no funciona, por favor, detalla tu problema en un correo a soporte.moodle@universidad.edu."
        ]
    },
    {
        "intencion": "conexion_wifi",
        "patrones": [
            "cómo me conecto al wifi", "problemas con la red inalambrica", "no tengo internet en la universidad",
            "wifi universidad", "red eduroam", "conectarme a internet", "red de la universidad", "problemas de conexión",
            "internet no funciona", "no me puedo conectar al wifi", "configurar wifi", "cómo usar eduroam"
        ],
        "respuestas": [
            "Para conectarte a la red Wi-Fi universitaria (Eduroam), sigue los pasos en nuestra guía oficial: [https://wifi.universidad.edu/guia-conexion].",
            "Si tienes problemas para conectar el Wi-Fi, asegúrate de que tu dispositivo no tenga restricciones y que las credenciales sean correctas. Si el problema persiste, visita el centro de soporte de TI en el campus o llama al 01-8000-123456."
        ]
    },
    {
        "intencion": "informacion_biblioteca",
        "patrones": [
            "horario biblioteca", "cómo acceder a la biblioteca virtual", "libros disponibles", "préstamo de libros",
            "buscar libros", "biblioteca", "horarios biblioteca", "cómo funciona la biblioteca", "recursos biblioteca",
            "catálogo de la biblioteca"
        ],
        "respuestas": [
            "El horario de la biblioteca central es de Lunes a Viernes de 8:00 AM a 8:00 PM y Sábados de 9:00 AM a 1:00 PM. Puedes acceder a la biblioteca virtual en [https://biblioteca.universidad.edu/virtual].",
            "Para consultar el catálogo de libros o acceder a recursos virtuales, visita el sitio web de la biblioteca: [https://biblioteca.universidad.edu]."
        ]
    },
    {
        "intencion": "contacto_soporte",
        "patrones": [
            "hablar con un agente", "necesito más ayuda", "no entiendo", "quiero hablar con una persona", "ayuda humana",
            "contacto soporte", "llamada", "correo de soporte", "hablar con alguien", "necesito soporte",
            "contacto con un técnico", "quién me puede ayudar", "soporte técnico", "contacto de soporte"
        ],
        "respuestas": [
            "Lamento no poder resolver tu consulta directamente. Puedes contactar a nuestro equipo de soporte técnico a través del correo [soporte.tecnico@universidad.edu] o llamando al [01-8000-123456].",
            "Mi capacidad es limitada. Por favor, contacta a un agente enviando un correo a [soporte.tecnico@universidad.edu] o llamando al [01-8000-123456] para una asistencia más personalizada."
        ]
    },
    {
        "intencion": "informacion_general",
        "patrones": [
            "dónde está la oficina de admisiones", "horario de oficinas", "contacto de decanato", "cómo funciona la universidad",
            "información de contacto", "número de teléfono de la universidad", "dirección de la universidad",
            "cómo llegar", "información sobre la universidad"
        ],
        "respuestas": [
            "Para información sobre oficinas o contactos específicos, te recomiendo visitar la sección 'Contacto' o 'Directorio' en el sitio web oficial de la universidad.",
            "Muchas de las oficinas tienen información y horarios en la página principal de la universidad. ¿Podrías especificar qué oficina buscas?"
        ]
    }
];

// --- 3. Procesamiento de Lenguaje Natural (NLP) con Natural.js ---

const classifier = new natural.BayesClassifier();

knowledgeBase.forEach(item => {
    item.patrones.forEach(patron => {
        classifier.addDocument(patron.toLowerCase(), item.intencion);
    });
});

classifier.train();

console.log("\n--- INICIO DE PRUEBA DE CLASIFICACIÓN RÁPIDA ---");
const testPhrases = [
    { text: "hola", expectedIntent: "saludo" },
    { text: "olvide mi contraseña", expectedIntent: "olvido_contrasena_correo" },
    { text: "no puedo entrar a moodle", expectedIntent: "problema_moodle" },
    { text: "hablar con una persona", expectedIntent: "contacto_soporte" },
    { text: "gracias", expectedIntent: "agradecimiento" },
    { text: "dónde está la biblioteca", expectedIntent: "informacion_biblioteca" },
    { text: "este es un mensaje de prueba que no existe", expectedIntent: "desconocida" }
];

testPhrases.forEach(test => {
    const classificationsTest = classifier.getClassifications(test.text.toLowerCase());
    const bestClassificationTest = classificationsTest && classificationsTest.length > 0 ? classificationsTest[0] : null;

    console.log(`\nProbando frase: "${test.text}"`);
    console.log("Clasificaciones detalladas:", classificationsTest);

    if (bestClassificationTest) {
        console.log(`Mejor clasificación: ${bestClassificationTest.label} (Confianza: ${bestClassificationTest.value.toFixed(4)})`);
        if (bestClassificationTest.label === test.expectedIntent) {
            console.log(`  -> ¡ÉXITO! La intención esperada "${test.expectedIntent}" fue correctamente detectada.`);
        } else {
            console.log(`  -> FALLO: La intención esperada era "${test.expectedIntent}", pero se detectó "${bestClassificationTest.label}".`);
        }
    } else {
        console.log("  -> No se obtuvo ninguna clasificación.");
    }
});
console.log("\n--- FIN DE PRUEBA DE CLASIFICACIÓN RÁPIDA ---\n");



/**
 * Función para encontrar la intención del usuario basándose en su entrada.
 * Utiliza una combinación de búsqueda directa y el clasificador de Naive Bayes.
 * @param {string} userInput - El texto ingresado por el usuario.
 * @returns {string} La intención detectada (e.g., "saludo", "olvido_contrasena_correo") o "desconocida".
 */
function getIntent(userInput) {
    const processedInput = userInput.toLowerCase();

    
    if (processedInput.includes("hola") || processedInput.includes("que tal") || processedInput.includes("buenos días")) {
        console.log("DEBUG (En Vivo): Coincidencia directa para 'saludo'.");
        return "saludo";
    }
    if (processedInput.includes("adiós") || processedInput.includes("hasta luego") || processedInput.includes("chao")) {
        console.log("DEBUG (En Vivo): Coincidencia directa para 'despedida'.");
        return "despedida";
    }
    if (processedInput.includes("gracias") || processedInput.includes("muchas gracias")) {
        console.log("DEBUG (En Vivo): Coincidencia directa para 'agradecimiento'.");
        return "agradecimiento";
    }
    if (processedInput.includes("olvide mi contraseña") || processedInput.includes("restablecer contraseña") || processedInput.includes("clave del correo")) {
        console.log("DEBUG (En Vivo): Coincidencia directa para 'olvido_contrasena_correo'.");
        return "olvido_contrasena_correo";
    }
    if (processedInput.includes("hablar con un agente") || processedInput.includes("necesito ayuda") || processedInput.includes("contacto soporte")) {
        console.log("DEBUG (En Vivo): Coincidencia directa para 'contacto_soporte'.");
        return "contacto_soporte";
    }
   
    let classifications = [];
    try {
        classifications = classifier.getClassifications(processedInput);
    } catch (e) {
        console.error("ERROR: Fallo al obtener clasificaciones de Natural.js:", e);
        return "desconocida";
    }

    console.log(`\nDEBUG (En Vivo): Entrada del usuario: "${userInput}"`);
    console.log("DEBUG (En Vivo): Clasificaciones detalladas del clasificador:", classifications);

    if (classifications && classifications.length > 0) {
        const bestClassification = classifications[0];
        console.log("DEBUG (En Vivo): Mejor clasificación detectada por clasificador:", bestClassification);

      
        const confidenceThreshold = 0.10;

        if (bestClassification.value > confidenceThreshold) {
            return bestClassification.label;
        }
    }
    
    console.log("DEBUG (En Vivo): Intención clasificada como 'desconocida' (sin coincidencia directa y confianza baja del clasificador).");
    return "desconocida";
}

function getResponse(intent) {
    const item = knowledgeBase.find(item => item.intencion === intent);
    if (item && item.respuestas.length > 0) {
        const randomIndex = Math.floor(Math.random() * item.respuestas.length);
        return item.respuestas[randomIndex];
    }
    return "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla o ser más específico? También puedes intentar 'hablar con un agente' si necesitas ayuda adicional.";
}


app.post('/chat', (req, res) => {
    const userInput = req.body.message;
    if (!userInput) {
        return res.status(400).json({ error: "El mensaje no puede estar vacío." });
    }
    const intent = getIntent(userInput);
    const botResponse = getResponse(intent);
    res.json({ response: botResponse });
});


app.listen(port, () => {
    console.log(`Servidor del chatbot corriendo en http://localhost:${port}`);
    console.log(`Accede a la interfaz del chat en http://localhost:${port}/`);
});