import express from 'express';
import { body } from 'express-validator';
import {
  crearPaciente,
  obtenerPacientes,
  mostrarFormularioEdicionPaciente,
  obtenerPacientePorId,
  editarPaciente,
  eliminarPaciente,
  buscarPacientes,
} from '../controllers/pacientesController';

const router = express.Router();

const validarCampos = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('cedula').notEmpty().withMessage('La cédula es obligatoria'),
  body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
  body('edad').notEmpty().withMessage('La edad es obligatoria').isInt({ min: 1 }).withMessage('La edad debe ser un número entero positivo'),
  body('telefono').notEmpty().withMessage('El teléfono es obligatorio'),
];

router.post('/', validarCampos, crearPaciente);
router.get('/', obtenerPacientes);
router.get('/editar/:id', mostrarFormularioEdicionPaciente);
router.get('/:id', obtenerPacientePorId);
router.put('/:id', validarCampos, editarPaciente);
router.delete('/:id', eliminarPaciente);
router.post('/buscar', buscarPacientes);

export { router as pacientesRoutes };
//export default router;