"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./app/config/db");
const doctoresRouter_1 = require("./app/routes/doctoresRouter");
const pacientesRouter_1 = require("./app/routes/pacientesRouter");
const citasRouter_1 = require("./app/routes/citasRouter");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configuración del puerto
const port = process.env.PORT || 3000;
// Configuración de los middlewares
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'app', 'views'));
// Configuración de las rutas
app.use('/doctores', doctoresRouter_1.doctoresRoutes);
app.use('/pacientes', pacientesRouter_1.pacientesRoutes);
app.use('/citas', citasRouter_1.citasRoutes);
// Ruta principal
app.get('/', (req, res) => {
    res.render('index');
});
// Inicialización del servidor
db_1.sequelize
    .sync()
    .then(() => {
    app.listen(port, () => {
        console.log(`Servidor iniciado en el puerto ${port}`);
    });
})
    .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
});
