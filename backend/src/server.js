import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));

// Para webhooks de MP necesitamos raw body, así que lo parseamos condicionalmente,
// pero para simplificar por ahora usamos express.json
app.use(express.json());

// Rutas principales
app.use('/api', apiRoutes);

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Pawners Backend corriendo en http://localhost:${PORT}`);
});
