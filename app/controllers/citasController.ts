import { Request, Response } from 'express';
import { validationResult, body } from 'express-validator';
import { Cita } from '../models/Cita';
import { Doctor } from '../models/Doctor';
import { Paciente } from '../models/Paciente';
import { Op } from 'sequelize';

export const crearCita = async (req: Request, res: Response) => {
  try {
    await body('numeroDocumentoPaciente').notEmpty().withMessage('El número de documento del paciente es obligatorio').run(req);
    await body('especialidad').notEmpty().withMessage('La especialidad es obligatoria').run(req);
    await body('doctorId').notEmpty().withMessage('El ID del doctor es obligatorio').isInt().withMessage('El ID del doctor debe ser un número entero').run(req);
    await body('pacienteId').notEmpty().withMessage('El ID del paciente es obligatorio').isInt().withMessage('El ID del paciente debe ser un número entero').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { numeroDocumentoPaciente, especialidad, doctorId, pacienteId } = req.body;

    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ mensaje: 'No se encontró el doctor' });
    }

    const paciente = await Paciente.findByPk(pacienteId);
    if (!paciente) {
      return res.status(404).json({ mensaje: 'No se encontró el paciente' });
    }

    const cita = await Cita.create({
      numeroDocumentoPaciente,
      especialidad,
      doctorId,
      pacienteId,
    });

    res.json({ cita });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al crear la cita' });
  }
};

export const obtenerCitas = async (req: Request, res: Response) => {
  try {
    const citas = await Cita.findAll({
      include: [
        { model: Doctor, as: 'doctor' },
        { model: Paciente, as: 'paciente' },
      ],
    });

    res.render('citas/index', { citas });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al obtener las citas' });
  }
};

export const mostrarFormularioEdicionCita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({ mensaje: 'No se encontró la cita' });
    }

    res.render('citas/editar', { cita });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al mostrar el formulario de edición' });
  }
};

export const obtenerCitaPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cita = await Cita.findByPk(id, {
      include: [
        { model: Doctor, as: 'doctor' },
        { model: Paciente, as: 'paciente' },
      ],
    });

    if (!cita) {
      return res.status(404).json({ mensaje: 'No se encontró la cita' });
    }

    res.json({ cita });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al obtener la cita' });
  }
};

export const editarCita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { numeroDocumentoPaciente, especialidad, doctorId, pacienteId } = req.body;

    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({ mensaje: 'No se encontró la cita' });
    }

    cita.numeroDocumentoPaciente = numeroDocumentoPaciente;
    cita.especialidad = especialidad;
    cita.doctorId = doctorId;
    cita.pacienteId = pacienteId;

    await cita.save();

    res.redirect('/citas');
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al editar la cita' });
  }
};

export const eliminarCita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({ mensaje: 'No se encontró la cita' });
    }

    await cita.destroy();

    res.redirect('/citas');
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al eliminar la cita' });
  }
};

export const buscarCitas = async (req: Request, res: Response) => {
  try {
    const { termino } = req.body;

    const citas = await Cita.findAll({
      where: {
        [Op.or]: [
          { numeroDocumentoPaciente: { [Op.like]: `%${termino}%` } },
          { especialidad: { [Op.like]: `%${termino}%` } },
        ],
      },
      include: [
        { model: Doctor, as: 'doctor' },
        { model: Paciente, as: 'paciente' },],
    });
    res.render('citas/index', { citas });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al buscar las citas' });
  }
};
