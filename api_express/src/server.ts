import Express from "express";
import router from './router';
import db from "./config/database";
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = Express();

// Conectar a la base de datos
export async function conectarDB() {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Conexión a la base de datos establecida correctamente');
    } catch (error) {
        console.log('Error al conectar a la base de datos:', error);
    }   
}

// CORS Configuración
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        
        // Permite peticiones sin origen (Postman, mobile) o desde la URL autorizada
        if (!origin || origin === frontendUrl) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS: Origen no permitido por la política'));
        }
    }
};

server.use(cors(corsOptions));

// Habilitar el uso de JSON en las peticiones
server.use(Express.json());

// Todas las rutas con /api
server.use('/api', router);

export default server;