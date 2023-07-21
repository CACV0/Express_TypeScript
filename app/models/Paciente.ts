import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Cita } from './Cita';


interface PacienteAttributes {
  id: number;
  nombre: string;
  cedula: string;
  apellido: string;
  edad: number;
  telefono: string;
}

interface PacienteCreationAttributes extends Optional<PacienteAttributes, 'id'> { }

class Paciente extends Model<PacienteAttributes, PacienteCreationAttributes> implements PacienteAttributes {
  public id!: number;
  public nombre!: string;
  public cedula!: string;
  public apellido!: string;
  public edad!: number;
  public telefono!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Paciente.init(
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
    cedula: {
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
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 0,
      },
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes',
  }
);


Paciente.hasMany(Cita, {as: 'citas', foreignKey: 'pacienteId' });


export { Paciente, PacienteAttributes, PacienteCreationAttributes };