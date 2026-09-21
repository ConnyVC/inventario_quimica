import { Request, Response } from 'express'
import Usuario from '../models/Usuario'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Rol from '../models/Rol'

export const login = async(request:Request, response:Response) => {
    const { correo, password } = request.body
    const SECRET = process.env.SECRET_KEY

    try{
        // Buscar usuario por Clave Primaria, Correo y Estado
        const usuario = await Usuario.findOne({ 
            where: {
                correoInstitucional: correo,
                estado: 1
            },
            include: [Rol]
        })
        
        // 1. Si no existe un usuario activo con ese correo
        if (!usuario) {
            return response.status(401).json({ 
                message: 'El correo institucional no se encuentra registrado o está inactivo' 
            })
        }

        // 2. Verificar la contraseña
            const isPasswordValid = await bcrypt.compare(password, usuario.contrasena)
            if (!isPasswordValid) {
                return response.status(401).json({ message: 'Contraseña incorrecta' })
            }
        
        // 3. Generar el Token JWT si la verificación fue exitosa
        const token = jwt.sign(
            { 
                idUsuario: usuario.idUsuario,
                correo: usuario.correoInstitucional,
                idRol: usuario.idRol,
                nombreRol: usuario.rol?.nombreRol
            },
            SECRET,
            { expiresIn: '1h' }
        )
        response.json({ 
            message: 'Inicio de sesión exitoso', 
            token,
            usuario: {
                idUsuario: usuario.idUsuario,
                idRol: usuario.idRol,
                nombreRol: usuario.rol?.nombreRol
            }  
        })

    } catch(error){
        console.error('Error en el login:', error)
        response.status(500).json({ message: 'Error en el servidor' })
    }
}


export const crearUsuario = async (request: Request, response: Response) => {
    const { rut, nombres, apellidoPaterno, apellidoMaterno, correoInstitucional, contrasena, idRol } = request.body

    // 1. Validar que vengan los campos obligatorios
    if (!rut || !nombres || !apellidoPaterno || !correoInstitucional || !contrasena || !idRol) {
      return response.status(400).json({
        error: 'Todos los campos obligatorios (RUT, Nombres, Apellido Paterno, Correo, Contraseña y Rol) deben ser proporcionados.'
      })
    }

    try{
        // 2. Verificar si el correo institucional ya existe
        const usuarioExistente = await Usuario.findOne({ where: { correoInstitucional } })
        if (usuarioExistente) {
            return response.status(409).json({ error: 'El correo institucional ya se encuentra registrado.' })
        }

        // 3. Verificar que el rol asignado exista en la base de datos
        const rolExiste = await Rol.findByPk(idRol)
        if (!rolExiste) {
            return response.status(404).json({ error: 'El rol especificado no existe.' })
        }

        // 4. Crear el nuevo usuario
        const nuevoUsuario = await Usuario.create({
            rut,
            nombres,
            apellidoPaterno,
            apellidoMaterno: apellidoMaterno || null,
            correoInstitucional,
            contrasena,
            idRol,
            estado: 1 // Habilitado por defecto
        })
        response.status(201).json({ message: 'Usuario creado exitosamente'})
  } catch (error) {
    console.error('Error al crear usuario:', error)
    return response.status(500).json({ error: 'Error interno del servidor al registrar el usuario'})
  }
} 
