import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getAll, getById, create, update, remove } from './sede.controller.js';

const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'public/uploads/sedes';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// Rutas
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', upload.single('imagen'), create);
router.put('/:id', upload.single('imagen'), update);
router.delete('/:id', remove);

export default router;