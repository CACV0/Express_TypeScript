"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Cita_1 = require("./Cita");
class Doctor extends sequelize_1.Model {
}
exports.Doctor = Doctor;
Doctor.init({
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
    apellido: {
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
    consultorio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
}, {
    sequelize: db_1.sequelize,
    modelName: 'Doctor',
    tableName: 'doctores',
});
Doctor.hasMany(Cita_1.Cita, { foreignKey: 'doctorId', as: 'citas' });
