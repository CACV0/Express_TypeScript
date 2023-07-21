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
exports.buscarCitas = exports.eliminarCita = exports.editarCita = exports.obtenerCitaPorId = exports.mostrarFormularioEdicionCita = exports.obtenerCitas = exports.crearCita = void 0;
const express_validator_1 = require("express-validator");
const Cita_1 = require("../models/Cita");
const Doctor_1 = require("../models/Doctor");
const Paciente_1 = require("../models/Paciente");
const sequelize_1 = require("sequelize");
const crearCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, express_validator_1.body)('numeroDocumentoPaciente').notEmpty().withMessage('El número de documento del paciente es obligatorio').run(req);
        yield (0, express_validator_1.body)('especialidad').notEmpty().withMessage('La especialidad es obligatoria').run(req);
        yield (0, express_validator_1.body)('doctorId').notEmpty().withMessage('El ID del doctor es obligatorio').isInt().withMessage('El ID del doctor debe ser un número entero').run(req);
        yield (0, express_validator_1.body)('pacienteId').notEmpty().withMessage('El ID del paciente es obligatorio').isInt().withMessage('El ID del paciente debe ser un número entero').run(req);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { numeroDocumentoPaciente, especialidad, doctorId, pacienteId } = req.body;
        const doctor = yield Doctor_1.Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ mensaje: 'No se encontró el doctor' });
        }
        const paciente = yield Paciente_1.Paciente.findByPk(pacienteId);
        if (!paciente) {
            return res.status(404).json({ mensaje: 'No se encontró el paciente' });
        }
        const cita = yield Cita_1.Cita.create({
            numeroDocumentoPaciente,
            especialidad,
            doctorId,
            pacienteId,
        });
        res.json({ cita });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al crear la cita' });
    }
});
exports.crearCita = crearCita;
const obtenerCitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const citas = yield Cita_1.Cita.findAll({
            include: [
                { model: Doctor_1.Doctor, as: 'doctor' },
                { model: Paciente_1.Paciente, as: 'paciente' },
            ],
        });
        res.render('citas/index', { citas });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener las citas' });
    }
});
exports.obtenerCitas = obtenerCitas;
const mostrarFormularioEdicionCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cita = yield Cita_1.Cita.findByPk(id);
        if (!cita) {
            return res.status(404).json({ mensaje: 'No se encontró la cita' });
        }
        res.render('citas/editar', { cita });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al mostrar el formulario de edición' });
    }
});
exports.mostrarFormularioEdicionCita = mostrarFormularioEdicionCita;
const obtenerCitaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cita = yield Cita_1.Cita.findByPk(id, {
            include: [
                { model: Doctor_1.Doctor, as: 'doctor' },
                { model: Paciente_1.Paciente, as: 'paciente' },
            ],
        });
        if (!cita) {
            return res.status(404).json({ mensaje: 'No se encontró la cita' });
        }
        res.json({ cita });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener la cita' });
    }
});
exports.obtenerCitaPorId = obtenerCitaPorId;
const editarCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { numeroDocumentoPaciente, especialidad, doctorId, pacienteId } = req.body;
        const cita = yield Cita_1.Cita.findByPk(id);
        if (!cita) {
            return res.status(404).json({ mensaje: 'No se encontró la cita' });
        }
        cita.numeroDocumentoPaciente = numeroDocumentoPaciente;
        cita.especialidad = especialidad;
        cita.doctorId = doctorId;
        cita.pacienteId = pacienteId;
        yield cita.save();
        res.redirect('/citas');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al editar la cita' });
    }
});
exports.editarCita = editarCita;
const eliminarCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cita = yield Cita_1.Cita.findByPk(id);
        if (!cita) {
            return res.status(404).json({ mensaje: 'No se encontró la cita' });
        }
        yield cita.destroy();
        res.redirect('/citas');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al eliminar la cita' });
    }
});
exports.eliminarCita = eliminarCita;
const buscarCitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { termino } = req.body;
        const citas = yield Cita_1.Cita.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { numeroDocumentoPaciente: { [sequelize_1.Op.like]: `%${termino}%` } },
                    { especialidad: { [sequelize_1.Op.like]: `%${termino}%` } },
                ],
            },
            include: [
                { model: Doctor_1.Doctor, as: 'doctor' },
                { model: Paciente_1.Paciente, as: 'paciente' },
            ],
        });
        res.render('citas/index', { citas });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al buscar las citas' });
    }
});
exports.buscarCitas = buscarCitas;
