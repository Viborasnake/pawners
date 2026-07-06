import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient.js';

export const register = async (req, res) => {
  try {
    const { email, password, full_name, role } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'El email ya está registrado' });

    const password_hash = await bcrypt.hash(password, 12);
    
    const user = await prisma.user.create({
      data: {
        email,
        password_hash,
        full_name,
        role: role || 'owner'
      }
    });

    // Si es cuidador o both, crear perfil de caregiver vacío
    if (user.role === 'caregiver' || user.role === 'both') {
      await prisma.caregiverProfile.create({
        data: { user_id: user.id }
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: { id: user.id, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // Actualizar last_active_at
    await prisma.user.update({ where: { id: user.id }, data: { last_active_at: new Date() }});

    res.json({ user: { id: user.id, email: user.email, role: user.role, name: user.full_name }, token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
};
