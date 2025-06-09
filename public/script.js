
document.addEventListener('DOMContentLoaded', () => {
    
    const userInput = document.getElementById('user-input'); 
    const sendButton = document.getElementById('send-button'); 
    const chatMessages = document.getElementById('chat-messages');

    
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; 
    }

   
    async function sendMessage() {
        const message = userInput.value.trim(); 
        if (message === '') return; 

        addMessage(message, 'user'); 
        userInput.value = ''; 

        try {
           
            const response = await fetch('/chat', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ message: message }), 
            });

            
            if (!response.ok) {
                
                throw new Error(`Error HTTP al comunicarse con el chatbot: ${response.status}`);
            }

            const data = await response.json(); 
            addMessage(data.response, 'bot'); 

        } catch (error) {
            
            console.error('Error al comunicarse con el chatbot:', error);
            addMessage('Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.', 'bot');
        }
    }

    
    sendButton.addEventListener('click', sendMessage);

   
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { 
            sendMessage();
        }
    });
});