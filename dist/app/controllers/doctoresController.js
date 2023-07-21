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
exports.buscarDoctores = exports.eliminarDoctor = exports.editarDoctor = exports.obtenerDoctorPorId = exports.mostrarFormularioEdicionDoctor = exports.obtenerDoctores = exports.crearDoctor = void 0;
const express_validator_1 = require("express-validator");
const Doctor_1 = require("../models/Doctor");
const Cita_1 = require("../models/Cita");
const sequelize_1 = require("sequelize");
const crearDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, express_validator_1.body)('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req);
        yield (0, express_validator_1.body)('apellido').notEmpty().withMessage('El apellido es obligatorio').run(req);
        yield (0, express_validator_1.body)('especialidad').notEmpty().withMessage('La especialidad es obligatoria').run(req);
        yield (0, express_validator_1.body)('consultorio').notEmpty().withMessage('El consultorio es obligatorio').run(req);
        yield (0, express_validator_1.body)('correo').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('Ingrese un correo válido').run(req);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { nombre, apellido, especialidad, consultorio, correo } = req.body;
        const doctor = yield Doctor_1.Doctor.create({
            nombre,
            apellido,
            especialidad,
            consultorio,
            correo
        });
        res.json({ doctor });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al crear el doctor' });
    }
});
exports.crearDoctor = crearDoctor;
const obtenerDoctores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctores = yield Doctor_1.Doctor.findAll({
            include: [{ model: Cita_1.Cita }],
        });
        res.render('doctores/index', { doctores });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener los doctores' });
    }
});
exports.obtenerDoctores = obtenerDoctores;
const mostrarFormularioEdicionDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const doctor = yield Doctor_1.Doctor.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ mensaje: 'No se encontró el doctor' });
        }
        res.render('doctores/editar', { doctor });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al mostrar el formulario de edición' });
    }
});
exports.mostrarFormularioEdicionDoctor = mostrarFormularioEdicionDoctor;
const obtenerDoctorPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const doctor = yield Doctor_1.Doctor.findByPk(id, {
            include: [{ model: Cita_1.Cita }],
        });
        if (!doctor) {
            return res.status(404).json({ mensaje: 'No se encontró el doctor' });
        }
        res.json({ doctor });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener el doctor' });
    }
});
exports.obtenerDoctorPorId = obtenerDoctorPorId;
const editarDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre, apellido, especialidad, consultorio, correo } = req.body;
        const doctor = yield Doctor_1.Doctor.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ mensaje: 'No se encontró el doctor' });
        }
        doctor.nombre = nombre;
        doctor.apellido = apellido;
        doctor.especialidad = especialidad;
        doctor.consultorio = consultorio;
        doctor.correo = correo;
        yield doctor.save();
        res.redirect('/doctores');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al editar el doctor' });
    }
});
exports.editarDoctor = editarDoctor;
const eliminarDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const doctor = yield Doctor_1.Doctor.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ mensaje: 'No se encontró el doctor' });
        }
        yield doctor.destroy();
        res.redirect('/doctores');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al eliminar el doctor' });
    }
});
exports.eliminarDoctor = eliminarDoctor;
const buscarDoctores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { termino } = req.body;
        const doctores = yield Doctor_1.Doctor.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { nombre: { [sequelize_1.Op.like]: `%${termino}%` } },
                    { apellido: { [sequelize_1.Op.like]: `%${termino}%` } },
                    { especialidad: { [sequelize_1.Op.like]: `%${termino}%` } },
                ],
            },
        });
        res.render('doctores/index', { doctores });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al buscar los doctores' });
    }
});
exports.buscarDoctores = buscarDoctores;
