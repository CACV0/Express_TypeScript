import express from 'express';
import { body } from 'express-validator';
import {
    crearCita,
    obtenerCitas,
    mostrarFormularioEdicionCita,
    obtenerCitaPorId,
    editarCita,
    eliminarCita,
    buscarCitas,
} from '../controllers/citasController';

const router = express.Router();

const validarCampos = [
    body('numeroDocumentoPaciente').notEmpty().withMessage('El número de documento del paciente es obligatorio'),
    body('especialidad').notEmpty().withMessage('La especialidad es obligatoria'),
    body('doctorId').notEmpty().withMessage('El ID del doctor es obligatorio').isInt().withMessage('El ID del doctor debe ser un número entero'),
    body('pacienteId').notEmpty().withMessage('El ID del paciente es obligatorio').isInt().withMessage('El ID del paciente debe ser un número entero'),
];

router.post('/', validarCampos, crearCita);
router.get('/', obtenerCitas);
router.get('/editar/:id', mostrarFormularioEdicionCita);
router.get('/:id', obtenerCitaPorId);
router.put('/:id', validarCampos, editarCita);
router.delete('/:id', eliminarCita);
router.post('/buscar', buscarCitas);

export { router as citasRoutes };
//export default router;
