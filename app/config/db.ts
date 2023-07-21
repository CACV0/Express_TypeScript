import { Sequelize } from 'sequelize';

// Configura la conexión a la base de datos
const sequelize = new Sequelize('Consultorio', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

// Conecta la base de datos
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión establecida correctamente');
    })
    .catch((error: any) => {
        console.error('Error al conectar la base de datos:', error);
    });

export { sequelize };