import { chatWithPetBot } from '../rag/petBot.js';

export const askPetBot = async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido.' });
    }

    const reply = await chatWithPetBot(message, history);
    
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'PetBot no está disponible en este momento.' });
  }
};
