import express from 'express';
import { authenticate, requireRole, requireIdentityVerified } from '../middlewares/authMiddleware.js';
import * as authController from '../controllers/authController.js';
import * as conversationController from '../controllers/conversationController.js';
import * as bookingController from '../controllers/bookingController.js';
import * as listingController from '../controllers/listingController.js';
import * as paymentController from '../controllers/paymentController.js';
import * as petBotController from '../controllers/petBotController.js';

const router = express.Router();

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Listings (Búsqueda pública)
router.get('/listings', listingController.searchListings);

// Listings (Privado)
router.post('/listings', authenticate, requireRole(['caregiver', 'both']), requireIdentityVerified, listingController.createListing);

// Mensajería
router.post('/conversations', authenticate, conversationController.createConversation);
router.post('/messages', authenticate, conversationController.sendMessage);

// Reservas
router.post('/bookings', authenticate, bookingController.createBooking);

// Webhooks
router.post('/webhooks/mercadopago', paymentController.mercadoPagoWebhook);

// Agente IA (PetBot)
router.post('/bot/chat', petBotController.askPetBot);

export default router;
