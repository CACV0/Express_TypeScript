"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Cita_1 = require("./Cita");
class Paciente extends sequelize_1.Model {
}
exports.Paciente = Paciente;
Paciente.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    edad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true,
            min: 0,
        },
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    sequelize: db_1.sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes',
});
Paciente.hasMany(Cita_1.Cita, { as: 'citas', foreignKey: 'pacienteId' });
