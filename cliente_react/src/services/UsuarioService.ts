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
    } catch (error:any){

        //API indica error

        return {
            success: false,
            error: error.response?.data?.error ?? 'Error desconocido',
        }
    }
}