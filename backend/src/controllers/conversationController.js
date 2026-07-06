import prisma from '../utils/prismaClient.js';

export const createConversation = async (req, res) => {
  try {
    const { caregiver_id } = req.body;
    const user = req.user;

    // LÓGICA DE NEGOCIO CRÍTICA 1: Restricción para Owners iniciando conversación
    if (user.role === 'owner' || (user.role === 'both' && req.body.as_owner)) {
      if (!req.isPremium) {
        return res.status(402).json({ 
          error: 'Payment Required',
          message: 'Para iniciar nuevas conversaciones necesitas una suscripción Premium.',
          cta: 'upgrade_premium'
        });
      }
    }

    // Verificar si ya existe
    let conv = await prisma.conversation.findFirst({
      where: {
        owner_id: user.id,
        caregiver_id: caregiver_id
      }
    });

    if (!conv) {
      conv = await prisma.conversation.create({
        data: {
          owner_id: user.id,
          caregiver_id: caregiver_id,
          initiated_by: user.id
        }
      });
    }

    res.status(201).json(conv);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear conversación' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { conversation_id, content } = req.body;
    
    // LÓGICA DE NEGOCIO CRÍTICA 2: Responder es gratis para todos.
    // Solo verificamos que el usuario pertenezca a la conversación.
    const conv = await prisma.conversation.findUnique({ where: { id: conversation_id } });
    
    if (!conv || (conv.owner_id !== req.user.id && conv.caregiver_id !== req.user.id)) {
      return res.status(403).json({ error: 'No tienes acceso a esta conversación' });
    }

    const message = await prisma.message.create({
      data: {
        conversation_id,
        sender_id: req.user.id,
        content
      }
    });

    await prisma.conversation.update({
      where: { id: conversation_id },
      data: { last_message_at: new Date() }
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
};
