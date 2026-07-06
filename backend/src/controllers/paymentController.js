import prisma from '../utils/prismaClient.js';

export const mercadoPagoWebhook = async (req, res) => {
  try {
    // LÓGICA DE NEGOCIO CRÍTICA 6: Webhook Mercado Pago
    // Nota: Aquí se debería verificar la firma (x-signature) para producción real
    
    const { type, data } = req.body;

    if (type === 'subscription_preapproval') {
      const subscriptionId = data.id;
      
      // En un entorno real se haría un fetch a la API de MP para confirmar:
      // const mpData = await fetch(`https://api.mercadopago.com/preapproval/${subscriptionId}`, {...});
      
      // Actualizar estado local
      await prisma.subscription.updateMany({
        where: { mp_subscription_id: subscriptionId },
        data: { status: 'active' }
      });
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Error procesando webhook' });
  }
};
