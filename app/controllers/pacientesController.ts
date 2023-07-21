import { Request, Response } from 'express';
import { validationResult, body } from 'express-validator';
import { Paciente } from '../models/Paciente';
import { Cita } from '../models/Cita';
import { Op } from 'sequelize';

export const crearPaciente = async (req: Request, res: Response) => {
    try {
        await body('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req);
        await body('cedula').notEmpty().withMessage('La cédula es obligatoria').run(req);
        await body('apellido').notEmpty().withMessage('El apellido es obligatorio').run(req);
        await body('edad').notEmpty().withMessage('La edad es obligatoria').isInt({ min: 0 }).withMessage('La edad debe ser un número entero positivo').run(req);
        await body('telefono').notEmpty().withMessage('El teléfono es obligatorio').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombre, cedula, apellido, edad, telefono } = req.body;

        const paciente = await Paciente.create({
            nombre,
            cedula,
            apellido,
            edad,
            telefono
        });

        res.json({ paciente });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al crear el paciente' });
    }
};

export const obtenerPacientes = async (req: Request, res: Response) => {
    try {
        const pacientes = await Paciente.findAll({
            include: [{ model: Cita }],
        });

        res.render('pacientes/index', { pacientes });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener los pacientes' });
    }
};

export const mostrarFormularioEdicionPaciente = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).json({ mensaje: 'No se encontró el paciente' });
        }

        res.render('pacientes/editar', { paciente });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al mostrar el formulario de edición' });
    }
};

export const obtenerPacientePorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const paciente = await Paciente.findByPk(id, {
            include: [{ model: Cita }],
        });

        if (!paciente) {
            return res.status(404).json({ mensaje: 'No se encontró el paciente' });
        }

        res.json({ paciente });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener el paciente' });
    }
};

export const editarPaciente = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, cedula, apellido, edad, telefono } = req.body;

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).json({ mensaje: 'No se encontró el paciente' });
        }

        paciente.nombre = nombre;
        paciente.cedula = cedula;
        paciente.apellido = apellido;
        paciente.edad = edad;
        paciente.telefono = telefono;

        await paciente.save();

        res.redirect('/pacientes');
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al editar el paciente' });
    }
};

export const eliminarPaciente = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).json({ mensaje: 'No se encontró el paciente' });
        }

        await paciente.destroy();

        res.redirect('/pacientes');
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al eliminar el paciente' });
    }
};

export const buscarPacientes = async (req: Request, res: Response) => {
    try {
        const { termino } = req.body;

        const pacientes = await Paciente.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.like]: `%${termino}%` } },
                    { cedula: { [Op.like]: `%${termino}%` } },
                    { apellido: { [Op.like]: `%${termino}%` } },
                ],
            },
        });

        res.render('pacientes/index', { pacientes });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al buscar los pacientes' });
    }
};
