import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Cita } from './Cita';

interface DoctorAttributes {
    id: number;
    nombre: string;
    apellido: string;
    especialidad: string;
    consultorio: string;
    correo: string;
}

interface DoctorCreationAttributes extends Optional<DoctorAttributes, 'id'> { }

class Doctor extends Model<DoctorAttributes, DoctorCreationAttributes> implements DoctorAttributes {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public especialidad!: string;
    public consultorio!: string;
    public correo!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Doctor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        apellido: {
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
        consultorio: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
    },
    {
        sequelize,
        modelName: 'Doctor',
        tableName: 'doctores',
    }
);

Doctor.hasMany(Cita, { foreignKey: 'doctorId', as: 'citas' });

export { Doctor, DoctorAttributes, DoctorCreationAttributes };
