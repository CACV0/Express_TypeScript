"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pacientesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const pacientesController_1 = require("../controllers/pacientesController");
const router = express_1.default.Router();
exports.pacientesRoutes = router;
const validarCampos = [
    (0, express_validator_1.body)('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    (0, express_validator_1.body)('cedula').notEmpty().withMessage('La cédula es obligatoria'),
    (0, express_validator_1.body)('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    (0, express_validator_1.body)('edad').notEmpty().withMessage('La edad es obligatoria').isInt({ min: 1 }).withMessage('La edad debe ser un número entero positivo'),
    (0, express_validator_1.body)('telefono').notEmpty().withMessage('El teléfono es obligatorio'),
];
router.post('/', validarCampos, pacientesController_1.crearPaciente);
router.get('/', pacientesController_1.obtenerPacientes);
router.get('/editar/:id', pacientesController_1.mostrarFormularioEdicionPaciente);
router.get('/:id', pacientesController_1.obtenerPacientePorId);
router.put('/:id', validarCampos, pacientesController_1.editarPaciente);
router.delete('/:id', pacientesController_1.eliminarPaciente);
router.post('/buscar', pacientesController_1.buscarPacientes);
//export default router;
