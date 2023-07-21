import express, { Application, Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { sequelize } from './app/config/db';
import { doctoresRoutes } from './app/routes/doctoresRouter';
import { pacientesRoutes } from './app/routes/pacientesRouter';
import { citasRoutes } from './app/routes/citasRouter';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();

// Configuración del puerto
const port = process.env.PORT || 3000;

// Configuración de los middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

// Configuración de las rutas
app.use('/doctores', doctoresRoutes);
app.use('/pacientes', pacientesRoutes);
app.use('/citas', citasRoutes);

// Ruta principal
app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// Inicialización del servidor
sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor iniciado en el puerto ${port}`);
        });
    })
    .catch((error: any) => {
        console.error('Error al conectar con la base de datos:', error);
    });

