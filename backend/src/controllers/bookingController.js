import prisma from '../utils/prismaClient.js';

export const createBooking = async (req, res) => {
  try {
    // LÓGICA DE NEGOCIO CRÍTICA 3: Identidad verificada
    if (!req.user.identity_verified) {
      return res.status(403).json({ error: 'Debes verificar tu identidad antes de reservar.' });
    }

    const { caregiver_id, listing_id, pet_id, start_date, end_date, service_type, subtotal } = req.body;

    // Calcular service fee: 3% para Premium, 15% para Free
    const feePercentage = req.isPremium ? 0.03 : 0.15;
    const feeAmount = Math.round(subtotal * feePercentage);
    const totalPrice = subtotal + feeAmount;

    const booking = await prisma.booking.create({
      data: {
        owner_id: req.user.id,
        caregiver_id,
        listing_id,
        pet_id,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        service_type,
        subtotal,
        service_fee_percentage: feePercentage * 100, // guardamos como 3 o 15
        service_fee_amount: feeAmount,
        total_price: totalPrice,
        status: 'pending'
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};
