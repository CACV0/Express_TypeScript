import express from 'express';
import { body } from 'express-validator';
import {
    crearDoctor,
    obtenerDoctores,
    mostrarFormularioEdicionDoctor,
    obtenerDoctorPorId,
    editarDoctor,
    eliminarDoctor,
    buscarDoctores,
} from '../controllers/doctoresController';

const router = express.Router();

const validarCampos = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('especialidad').notEmpty().withMessage('La especialidad es obligatoria'),
    body('consultorio').notEmpty().withMessage('El consultorio es obligatorio'),
    body('correo').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('Ingrese un correo válido'),
];
    
router.post('/', validarCampos, crearDoctor);
router.get('/', obtenerDoctores);
router.get('/editar/:id', mostrarFormularioEdicionDoctor);
router.get('/:id', obtenerDoctorPorId);
router.put('/:id', editarDoctor);   
router.delete('/:id', eliminarDoctor);
router.post('/buscar', buscarDoctores);

export { router as doctoresRoutes };
//export default router;