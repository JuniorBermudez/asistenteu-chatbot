// public/chat.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("user-input");
    const messages = document.getElementById("chat-messages");

    function appendMessage(sender, text) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = text;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userMessage = input.value.trim();
        if (!userMessage) return;

        appendMessage("user", userMessage);
        input.value = "";

        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            appendMessage("bot", data.response);
        } catch (error) {
            console.error("Error al contactar al backend:", error);
            appendMessage("bot", "Hubo un problema al conectar con el servidor.");
        }
    });
});
