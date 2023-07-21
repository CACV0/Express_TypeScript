"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cita = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Doctor_1 = require("./Doctor");
const Paciente_1 = require("./Paciente");
class Cita extends sequelize_1.Model {
}
exports.Cita = Cita;
Cita.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    numeroDocumentoPaciente: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    especialidad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    doctorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    pacienteId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    sequelize: db_1.sequelize,
    modelName: 'Cita',
    tableName: 'citas',
});
Cita.belongsTo(Doctor_1.Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Cita.belongsTo(Paciente_1.Paciente, { foreignKey: 'pacienteId', as: 'paciente' });
