import { safeParse } from "valibot";
import { LoginFormSchema } from "../types/usuario";
import axios from '../services/axiosInstance'

type UsuarioFormData = {
    [key: string]: FormDataEntryValue;
}

export async function login(formData:UsuarioFormData){
    try {
        const resultado = safeParse(LoginFormSchema, formData)
        if(resultado.success){
            //data del form pasa la validacion del schema
            //const url = `${import.meta.env.VITE_API_URL}/login`
            const url = '/login'
            const {data} = await axios.post(url, resultado.output)
            localStorage.setItem('token', data.token)
            return {success: true}
        } else {
            //no pasa validacion, mostrar errores
            const detalleErrores: Record<string, string[]> = {}

            for (const issue of resultado.issues) {
                const campo = issue.path![0].key as string
                if (!detalleErrores[campo]) {
                    detalleErrores[campo] = []
                }
                detalleErrores[campo].push(issue.message)
            }
            return {
                success: false,
                error: 'Datos de formulario no validos',
                detalleErrores: detalleErrores,
            }

        }
    } catch (error: any) {
    console.group('🔍 Depuración de Error en Login');
    console.error('Objeto Error Completo:', error);

    if (error.response) {
      const mensajeBackend = error.response.data?.msg || error.response.data?.message || error.response.data?.error;
      return {
        success: false,
        error: mensajeBackend || `Error ${error.response.status}: Respuesta no válida del servidor`
      };
    } else if (error.request) {
      return {
        success: false,
        error: `No se pudo conectar con el servidor en "${error.config?.baseURL || ''}${error.config?.url || ''}". Revisa si el backend está activo o los permisos CORS.`
      };
    } else {
      return {
        success: false,
        error: error.message || 'Error desconocido al procesar la solicitud'
      };
    }
  }
}