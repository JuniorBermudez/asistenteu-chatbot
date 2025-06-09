const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');

        const botResponses = {
            'saludo': '👋 ¡Hola! ¿En qué puedo ayudarte hoy? Selecciona una de las opciones disponibles abajo:',
            'despedida': '👋 ¡Hasta luego! Si necesitas más ayuda, aquí estaré 😊',
            'agradecimiento': '🙏 ¡Con gusto! Si tienes más preguntas, no dudes en escribirme.',
            'admisiones': '🎓 Información sobre admisiones en UNIPAZ:<br><br>• Inscripciones abiertas: Fechas actualizadas en la web<br>• Formulario de inscripción disponible en <a href="https://www.unipaz.edu.co" target="_blank" rel="noopener noreferrer">www.unipaz.edu.co</a><br>• Requisitos: Documento de identidad, pruebas Saber 11, etc.<br>• Contacto: admisiones@unipaz.edu.co - Ext: 1102',
            'oferta académica': '📘 Programas ofrecidos por UNIPAZ:<br><br>• Ingeniería Agroindustrial<br>• Medicina Veterinaria<br>• Tecnología en Recursos Naturales<br>• Derecho, Administración, y más...<br>• Catálogo completo en: <a href="https://www.unipaz.edu.co/oferta-academica" target="_blank" rel="noopener noreferrer">www.unipaz.edu.co/oferta-academica</a>',
            'calendario académico': '📅 Calendario Académico:<br><br>• Inicio semestre A: Enero 29<br>• Semana Santa: Marzo 24 - 30<br>• Finalización semestre: Junio 14<br>• Descárgalo completo en: <a href="https://www.unipaz.edu.co/calendario" target="_blank" rel="noopener noreferrer">www.unipaz.edu.co/calendario</a>',
            'campus virtual': '💻 Problemas con el campus virtual:<br><br>• Plataforma: <a href="https://virtual.unipaz.edu.co" target="_blank" rel="noopener noreferrer">virtual.unipaz.edu.co</a><br>• Si no puedes acceder: verifica usuario y contraseña institucional<br>• Contacto soporte: soportevirtual@unipaz.edu.co<br>• Teléfono: (7) 6500000 ext. 2205',
            'soporte técnico': '🔧 Soporte Técnico UNIPAZ:<br><br>• Correo: sistemas@unipaz.edu.co<br>• Chat en línea: <a href="https://unipaz.edu.co/soysoporte.html" target="_blank" rel="noopener noreferrer">UNIPAZ en tu Casa</a><br>• Horario de atención: Lunes a Viernes 8:00 am - 12:00 m, 1:30 pm - 4:00 pm',
            'bienestar universitario': '💚 Bienestar Universitario:<br><br>• Servicios: Psicología, deportes, cultura y salud<br>• Contacto: bienestar@unipaz.edu.co<br>• Oficinas en sede principal (bloque A)<br>• Celular: 322 270 36 65',
            'matricula cero': '💰 Matrícula Cero:<br><br>• Beneficio para estudiantes de estratos 1, 2 y 3<br>• Aplica para programas de pregrado<br>• Más información en: <a href="https://noticias.unipaz.edu.co/2021/08/estudiantes-unipaz-de-estratos-1-2-y-3.html" target="_blank" rel="noopener noreferrer">noticias.unipaz.edu.co</a>',
            'trámites administrativos': '📝 Trámites Administrativos:<br><br>• Certificados académicos, paz y salvo, entre otros<br>• Solicitudes a través de la Oficina de Registro Académico<br>• Contacto: registro@unipaz.edu.co<br>• Teléfono: (7) 6500000 ext. 2206',
            'contacto': '📞 Contacto UNIPAZ:<br><br>• Dirección: Centro de Investigaciones Santa Lucía, Km 14 vía Bucaramanga<br>• PBX: (7) 611 82 10<br>• Correo: atencionalciudadano@unipaz.edu.co<br>• Horario de atención: Lunes a Jueves 7:00 am - 12:00 m y 1:00 pm - 5:00 pm; Viernes 7:00 am - 12:00 m y 1:00 pm - 4:00 pm',
            'default': '😕 Lo siento, no logré entender tu mensaje. Por favor, elige una de las opciones disponibles para poder ayudarte mejor:'
        };

        function matchesAny(message, patterns) {
            return patterns.some(pattern => new RegExp(pattern, 'i').test(message));
        }

        function getQuickRepliesHTML() {
            return `<div class="quick-replies">
                <div class="quick-reply" onclick="sendQuickReply('Admisiones')">Admisiones</div>
                <div class="quick-reply" onclick="sendQuickReply('Oferta académica')">Oferta Académica</div>
                <div class="quick-reply" onclick="sendQuickReply('Calendario académico')">Calendario Académico</div>
                <div class="quick-reply" onclick="sendQuickReply('Soporte técnico')">Soporte Técnico</div>
                <div class="quick-reply" onclick="sendQuickReply('Bienestar universitario')">Bienestar Universitario</div>
                <div class="quick-reply" onclick="sendQuickReply('Matrícula Cero')">Matrícula Cero</div>
                <div class="quick-reply" onclick="sendQuickReply('Trámites administrativos')">Trámites Administrativos</div>
                <div class="quick-reply" onclick="sendQuickReply('Contacto')">Contacto</div>
            </div>`;
        }

        function getBotResponse(message) {
            message = message.toLowerCase();

            if (matchesAny(message, ['\\bhola+\\b', 'buen[oa]s', 'buenos días', 'buenas tardes', 'buenas noches', 'hey+', 'ey+', 'holii+', 'holaa+', '👋', 'qué tal', 'saludos'])) {
                return botResponses['saludo'] + getQuickRepliesHTML();
            }

            if (matchesAny(message, ['ad[ií]o+s?', 'chao+', 'chau+', 'hasta luego', 'nos vemos', 'me voy', 'bye+', '👋'])) {
                return botResponses['despedida'];
            }

            if (matchesAny(message, ['grac[ia]+s+', 'mil gracias', 'te agradezco', 'se agradece', '🙌', '🙏'])) {
                return botResponses['agradecimiento'];
            }

            if (message.includes('admisión') || message.includes('admisiones') || message.includes('inscripción') || message.includes('inscripciones')) {
                return botResponses['admisiones'];
            } else if (message.includes('programa') || message.includes('oferta')) {
                return botResponses['oferta académica'];
            } else if (message.includes('calendario') || message.includes('fechas')) {
                return botResponses['calendario académico'];
            } else if (message.includes('campus') || message.includes('virtual') || message.includes('plataforma')) {
                return botResponses['campus virtual'];
            } else if (message.includes('soporte') || message.includes('técnico') || message.includes('problema')) {
                return botResponses['soporte técnico'];
            } else if (message.includes('bienestar') || message.includes('psicología')) {
                return botResponses['bienestar universitario'];
            } else if (message.includes('matrícula cero') || message.includes('beneficio')) {
                return botResponses['matricula cero'];
            } else if (message.includes('trámite') || message.includes('certificado')) {
                return botResponses['trámites administrativos'];
            } else if (message.includes('contacto') || message.includes('teléfono')) {
                return botResponses['contacto'];
            } else {
                return botResponses['default'] + getQuickRepliesHTML();
            }
        }

        function sendMessage() {
            const message = userInput.value.trim();
            if (!message) return;

            addMessage(message, 'user');
            userInput.value = '';
            userInput.style.height = '44px';

            showTypingIndicator();

            setTimeout(() => {
                hideTypingIndicator();
                const response = getBotResponse(message);
                addMessage(response, 'bot');
            }, 1500 + Math.random() * 1000);
        }

        function addMessage(content, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;

            if (sender === 'bot') {
                messageDiv.innerHTML = `<div class="avatar">🤖</div><div class="content">${content.replace(/\n/g, '<br>')}</div>`;
            } else {
                messageDiv.innerHTML = `<div class="content">${content}</div>`;
            }

            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="avatar">🤖</div>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>`;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function hideTypingIndicator() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) typingIndicator.remove();
        }

        function sendQuickReply(text) {
            userInput.value = text;
            sendMessage();
        }

        userInput.addEventListener('input', function () {
            this.style.height = '44px';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });

        sendButton.addEventListener('click', sendMessage);

        userInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        window.addEventListener('load', () => {
            userInput.focus();
        });