"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Configura la conexión a la base de datos
const sequelize = new sequelize_1.Sequelize('Consultorio', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.sequelize = sequelize;
// Conecta la base de datos
sequelize
    .authenticate()
    .then(() => {
    console.log('Conexión establecida correctamente');
})
    .catch((error) => {
    console.error('Error al conectar la base de datos:', error);
});
