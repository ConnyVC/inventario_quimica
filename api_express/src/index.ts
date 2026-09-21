import server, { conectarDB } from "./server";

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        // Conectar BD primero
        await conectarDB();

        // Iniciar el listener de Express
        const app = server.listen(PORT, () => {
            console.log(`Inicio API Express en el puerto ${PORT}`);
        });

        // Previene que Node termine inesperadamente el proceso
        app.on('error', (error: any) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`Error: El puerto ${PORT} ya está siendo utilizado por otro proceso.`);
            } else {
                console.error('Error en el servidor HTTP:', error);
            }
        });

    } catch (error) {
        console.error('Error fatal al iniciar la aplicación:', error);
    }
}

main();