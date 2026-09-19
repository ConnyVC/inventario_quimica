import { email, nonEmpty, object, pipe, string} from "valibot";

export const LoginFormSchema = object({
    correo: pipe(string(), nonEmpty('Indique su email'), email('Correo no valido')),
    password: pipe(string(), nonEmpty('Indique su contraseña'))
})