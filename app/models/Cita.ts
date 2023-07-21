import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Doctor } from './Doctor';
import { Paciente } from './Paciente';

interface CitaAttributes {
    id: number;
    numeroDocumentoPaciente: string;
    especialidad: string;
    doctorId: number;
    pacienteId: number;
}

interface CitaCreationAttributes extends Optional<CitaAttributes, 'id'> { }

class Cita extends Model<CitaAttributes, CitaCreationAttributes> implements CitaAttributes {
    public id!: number;
    public numeroDocumentoPaciente!: string;
    public especialidad!: string;
    public doctorId!: number;
    public pacienteId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Cita.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        numeroDocumentoPaciente: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        especialidad: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        pacienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        sequelize,
        modelName: 'Cita',
        tableName: 'citas',
    }
);

Cita.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' })    ;
Cita.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente' });

export { Cita, CitaAttributes, CitaCreationAttributes };
