import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { create, obtenerTodos, actualizar } from './tratamiento.controller.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'public/uploads/tratamientos';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', obtenerTodos);
router.post('/', upload.single('imagen'), create);
router.put('/:id', upload.single('imagen'), actualizar);

export default router;