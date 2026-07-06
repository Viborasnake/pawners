import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient.js';

// Verifica que el token sea válido y carga al usuario en req.user (incluyendo su suscripción)
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No autorizado. Token faltante.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        subscriptions: {
          where: { status: 'active' },
          take: 1
        }
      }
    });

    if (!user) return res.status(401).json({ error: 'Usuario no encontrado.' });

    req.user = user;
    // Helper booleano para chequear si tiene premium activo
    req.isPremium = user.subscriptions.length > 0 && user.subscriptions[0].plan_type === 'premium';
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    if (!allowedRoles.includes(req.user.role) && req.user.role !== 'both') {
      return res.status(403).json({ error: 'No tienes el rol necesario para esta acción.' });
    }
    next();
  };
};

export const requireIdentityVerified = (req, res, next) => {
  if (!req.user.identity_verified) {
    return res.status(403).json({ error: 'Debes verificar tu identidad primero.' });
  }
  next();
};
