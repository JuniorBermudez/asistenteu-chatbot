const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));


function findResponse(message) {
  const msg = message.toLowerCase();
  for (const entry of responses) {
    if (entry.keywords.some(keyword => msg.includes(keyword))) {
      return entry.response;
    }
  }
  return "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla o ser más específico?";
}

app.post('/chat', (req, res) => {
  const userInput = req.body.message;
  if (!userInput) {
    return res.status(400).json({ error: "El mensaje no puede estar vacío." });
  }
  const botResponse = findResponse(userInput);
  res.json({ response: botResponse });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
