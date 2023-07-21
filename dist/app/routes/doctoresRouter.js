"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctoresRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const doctoresController_1 = require("../controllers/doctoresController");
const router = express_1.default.Router();
exports.doctoresRoutes = router;
const validarCampos = [
    (0, express_validator_1.body)('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    (0, express_validator_1.body)('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    (0, express_validator_1.body)('especialidad').notEmpty().withMessage('La especialidad es obligatoria'),
    (0, express_validator_1.body)('consultorio').notEmpty().withMessage('El consultorio es obligatorio'),
    (0, express_validator_1.body)('correo').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('Ingrese un correo válido'),
];
router.post('/', validarCampos, doctoresController_1.crearDoctor);
router.get('/', doctoresController_1.obtenerDoctores);
router.get('/editar/:id', doctoresController_1.mostrarFormularioEdicionDoctor);
router.get('/:id', doctoresController_1.obtenerDoctorPorId);
router.put('/:id', doctoresController_1.editarDoctor);
router.delete('/:id', doctoresController_1.eliminarDoctor);
router.post('/buscar', doctoresController_1.buscarDoctores);
//export default router;
