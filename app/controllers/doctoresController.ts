import { Request, Response } from 'express';
import { validationResult, body } from 'express-validator';
import { Doctor } from '../models/Doctor';
import { Cita } from '../models/Cita';
import { Op } from 'sequelize';

export const crearDoctor = async (req: Request, res: Response) => {
    try {
        await body('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req);
        await body('apellido').notEmpty().withMessage('El apellido es obligatorio').run(req);
        await body('especialidad').notEmpty().withMessage('La especialidad es obligatoria').run(req);
        await body('consultorio').notEmpty().withMessage('El consultorio es obligatorio').run(req);
        await body('correo').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('Ingrese un correo válido').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombre, apellido, especialidad, consultorio, correo } = req.body;

        const doctor = await Doctor.create({
            nombre,
            apellido,
            especialidad,
            consultorio,
            correo
        });

        res.json({ doctor });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al crear el doctor' });
    }
};

export const obtenerDoctores = async (req: Request, res: Response) => {
    try {
        const doctores = await Doctor.findAll({
            include: [{ model: Cita }],
        });

        res.render('doctores/index', { doctores });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener los doctores' });
    }
};

export const mostrarFormularioEdicionDoctor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findByPk(id);

        if (!doctor) {
            return res.status(404).json({ mensaje: 'No se encontró el doctor' });
        }

        res.render('doctores/editar', { doctor });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al mostrar el formulario de edición' });
    }
};

export const obtenerDoctorPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findByPk(id, {
            include: [{ model: Cita }],
        });

        if (!doctor) {
            return res.status(404).json({ mensaje: 'No se encontró el doctor' });
        }

        res.json({ doctor });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener el doctor' });
    }
};

export const editarDoctor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, especialidad, consultorio, correo } = req.body;

        const doctor = await Doctor.findByPk(id);

        if (!doctor) {
            return res.status(404).json({ mensaje: 'No se encontró el doctor' });
        }

        doctor.nombre = nombre;
        doctor.apellido = apellido;
        doctor.especialidad = especialidad;
        doctor.consultorio = consultorio;
        doctor.correo = correo;

        await doctor.save();

        res.redirect('/doctores');
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al editar el doctor' });
    }
};

export const eliminarDoctor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findByPk(id);

        if (!doctor) {
            return res.status(404).json({ mensaje: 'No se encontró el doctor' });
        }

        await doctor.destroy();

        res.redirect('/doctores');
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al eliminar el doctor' });
    }
};

export const buscarDoctores = async (req: Request, res: Response) => {
    try {
        const { termino } = req.body;

        const doctores = await Doctor.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.like]: `%${termino}%` } },
                    { apellido: { [Op.like]: `%${termino}%` } },
                    { especialidad: { [Op.like]: `%${termino}%` } },
                ],
            },
        });

        res.render('doctores/index', { doctores });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al buscar los doctores' });
    }
};
