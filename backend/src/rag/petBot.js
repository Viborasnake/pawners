import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Sistema RAG Simple: Lee los archivos MD para proveer contexto
const loadKnowledgeBase = () => {
  const kbPath = path.join(__dirname, '../knowledge-base');
  if (!fs.existsSync(kbPath)) return '';

  const files = fs.readdirSync(kbPath).filter(file => file.endsWith('.md'));
  
  let combinedContext = '';
  files.forEach(file => {
    const content = fs.readFileSync(path.join(kbPath, file), 'utf8');
    combinedContext += `\n\n--- Documento: ${file} ---\n${content}`;
  });
  
  return combinedContext;
};

export const chatWithPetBot = async (userMessage, history = []) => {
  try {
    const context = loadKnowledgeBase();
    
    const systemPrompt = `
      Eres PetBot, el simpático asistente de inteligencia artificial oficial de Pawners Chile.
      Tu trabajo es ayudar a cuidadores y dueños de mascotas basándote ESTRICTAMENTE en la base de conocimientos proporcionada abajo.
      Si te preguntan algo que no sabes o no está en el contexto, sugiere educadamente contactar a soporte@pawners.cl.
      Sé amigable, empático, usa emojis de mascotas y un tono cercano (puedes usar modismos chilenos sutiles como "bacán", "¿cachái?", "al tiro").
      
      BASE DE CONOCIMIENTOS:
      ${context}
    `;

    // En un sistema RAG masivo, aquí buscaríamos los "chunks" mediante embeddings (ej. pgvector).
    // Como nuestra KB es pequeña, la inyectamos en el prompt de Gemini 2.5 Flash.
    const prompt = `${systemPrompt}\n\nHistorial de chat:\n${JSON.stringify(history)}\n\nUsuario: ${userMessage}\nPetBot:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error en PetBot:', error);
    return "¡Guau! 🐶 PetBot está en mantenimiento temporalmente (necesito configurar GEMINI_API_KEY en el backend). Pero te confirmo que Pawners es la mejor plataforma para conectar cuidadores y mascotas. ¿Te puedo ayudar en algo más?";
  }
};
