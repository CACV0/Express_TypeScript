"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.citasRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const citasController_1 = require("../controllers/citasController");
const router = express_1.default.Router();
exports.citasRoutes = router;
const validarCampos = [
    (0, express_validator_1.body)('numeroDocumentoPaciente').notEmpty().withMessage('El número de documento del paciente es obligatorio'),
    (0, express_validator_1.body)('especialidad').notEmpty().withMessage('La especialidad es obligatoria'),
    (0, express_validator_1.body)('doctorId').notEmpty().withMessage('El ID del doctor es obligatorio').isInt().withMessage('El ID del doctor debe ser un número entero'),
    (0, express_validator_1.body)('pacienteId').notEmpty().withMessage('El ID del paciente es obligatorio').isInt().withMessage('El ID del paciente debe ser un número entero'),
];
router.post('/', validarCampos, citasController_1.crearCita);
router.get('/', citasController_1.obtenerCitas);
router.get('/editar/:id', citasController_1.mostrarFormularioEdicionCita);
router.get('/:id', citasController_1.obtenerCitaPorId);
router.put('/:id', validarCampos, citasController_1.editarCita);
router.delete('/:id', citasController_1.eliminarCita);
router.post('/buscar', citasController_1.buscarCitas);
//export default router;
