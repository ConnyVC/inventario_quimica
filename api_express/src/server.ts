import Express, { request, response } from "express";
import router from './router'
import db from "./config/database";
import cors, { CorsOptions } from 'cors';

const server = Express()

//Conectar a la base de datos
async function conectarDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.log('Error al conectar a la base de datos')
        console.log(error)
    }   
}

conectarDB()

//CORS
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || origin === process.env.FRONTEND_URL) {
            //permitir el origen
            callback(null, true)
        } else {
            //no permitir el origen
            callback(new Error('Error de CORS'),false)
        }
    }
}

server.use(cors(corsOptions))

//Hbilitar el uso de JSON en las peticiones
server.use(Express.json())


//todos los request que comienzen con /api se deben deribar a router.ts
server.use('/api', router)

export default server