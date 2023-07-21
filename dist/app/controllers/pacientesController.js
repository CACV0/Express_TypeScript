"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarPacientes = exports.eliminarPaciente = exports.editarPaciente = exports.obtenerPacientePorId = exports.mostrarFormularioEdicionPaciente = exports.obtenerPacientes = exports.crearPaciente = void 0;
const express_validator_1 = require("express-validator");
const Paciente_1 = require("../models/Paciente");
const Cita_1 = require("../models/Cita");
const sequelize_1 = require("sequelize");
const crearPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, express_validator_1.body)('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req);
        yield (0, express_validator_1.body)('cedula').notEmpty().withMessage('La cédula es obligatoria').run(req);
        yield (0, express_validator_1.body)('apellido').notEmpty().withMessage('El apellido es obligatorio').run(req);
        yield (0, express_validator_1.body)('edad').notEmpty().withMessage('La edad es obligatoria').isInt({ min: 0 }).withMessage('La edad debe ser un número entero positivo').run(req);
        yield (0, express_validator_1.body)('telefono').notEmpty().withMessage('El teléfono es obligatorio').run(req);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { nombre, cedula, apellido, edad, telefono } = req.body;
        const paciente = yield Paciente_1.Paciente.create({
            nombre,
            cedula,
            apellido,
            edad,
            telefono
        });
        res.json({ paciente });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al crear el paciente' });
    }
});
exports.crearPaciente = crearPaciente;
const obtenerPacientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pacientes = yield Paciente_1.Paciente.findAll({
            include: [{ model: Cita_1.Cita }],
        });
        res.render('pacientes/index', { pacientes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener los pacientes' });
    }
});
exports.obtenerPacientes = obtenerPacientes;
const mostrarFormularioEdicionPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const paciente = yield Paciente_1.Paciente.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ mensaje: 'No se encontró el paciente' });
        }
        res.render('pacientes/editar', { paciente });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al mostrar el formulario de edición' });
    }
});
exports.mostrarFormularioEdicionPaciente = mostrarFormularioEdicionPaciente;
const obtenerPacientePorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const paciente = yield Paciente_1.Paciente.findByPk(id, {
            include: [{ model: Cita_1.Cita }],
        });
        if (!paciente) {
            return res.status(404).json({ mensaje: 'No se encontró el paciente' });
        }
        res.json({ paciente });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener el paciente' });
    }
});
exports.obtenerPacientePorId = obtenerPacientePorId;
const editarPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre, cedula, apellido, edad, telefono } = req.body;
        const paciente = yield Paciente_1.Paciente.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ mensaje: 'No se encontró el paciente' });
        }
        paciente.nombre = nombre;
        paciente.cedula = cedula;
        paciente.apellido = apellido;
        paciente.edad = edad;
        paciente.telefono = telefono;
        yield paciente.save();
        res.redirect('/pacientes');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al editar el paciente' });
    }
});
exports.editarPaciente = editarPaciente;
const eliminarPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const paciente = yield Paciente_1.Paciente.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ mensaje: 'No se encontró el paciente' });
        }
        yield paciente.destroy();
        res.redirect('/pacientes');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al eliminar el paciente' });
    }
});
exports.eliminarPaciente = eliminarPaciente;
const buscarPacientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { termino } = req.body;
        const pacientes = yield Paciente_1.Paciente.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { nombre: { [sequelize_1.Op.like]: `%${termino}%` } },
                    { cedula: { [sequelize_1.Op.like]: `%${termino}%` } },
                    { apellido: { [sequelize_1.Op.like]: `%${termino}%` } },
                ],
            },
        });
        res.render('pacientes/index', { pacientes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al buscar los pacientes' });
    }
});
exports.buscarPacientes = buscarPacientes;
