import express from 'express';
import { obtenerOdontologos } from './odontologo.controller.js';

const router = express.Router();

// Ruta pública para frontend (sin autenticación)
router.get('/', obtenerOdontologos);

export default router;