import { Request, Response } from "express"
import Reactivo from "../models/Reactivo"
import Categoria from "../models/CategoriaPeligrosidad"

//Lista todos los reactivos
export const getReactivos = async(request:Request,response:Response)=>{
    //response.json('Listar reactivos')
    //const reactivos = await Reactivo.findAll()
    const reactivos = await Reactivo.findAll({
        order: [
            ['idReactivo', 'ASC']
        ]
    })
    response.json({data: reactivos})
}

//Lista cantidad de reactivos
export const getReactivosConCantidad = async(request:Request,response:Response)=>{
    response.json('Listar reactivos con cantidad')
}

//Lista info de un reactivo segun su id
export const getReactivoById = async(request:Request,response:Response)=>{
    const {id} = request.params
    //response.json('Listar reactivo: ' + id)
    const reactivo = await Reactivo.findByPk(id as unknown as number)
    response.json({data: reactivo})
}

//Lista los reactivos indicando la categoria a la que pertenecen
export const getReactivosConCategoria = async(request:Request,response:Response)=>{
    //response.json('Listar reactivos con categoria')
    const reactivos = await Reactivo.findAll({
        include: [
            {
                model: Categoria,
                attributes: ['idCategoria', 'nombreCategoria']
            }
        ],
        order: [
            ['nombreQuimico', 'ASC'],
            ['idCategoria', 'DESC']
        ]
    })
    response.json({data: reactivos})
}

//Crear un reactivo
export const crearReactivo = async(request:Request,response:Response)=>{
    //response.json('Crear nuevo reactivo')
    console.log(request.body)
    const reactivoNuevo = await Reactivo.create(request.body)
    response.json({data: reactivoNuevo})
}

//Editar un reactivo
export const editarReactivo = async(request:Request,response:Response)=>{
    const {id} = request.params
    //response.json('Editar reactivo: ' + id)
    const reactivo = await Reactivo.findByPk(id as unknown as number)
    await reactivo.update(request.body)
    await reactivo.save()
    response.json({data: reactivo})
}

//Borra un reactivo
export const borrarReactivo = async(request:Request,response:Response)=>{
    const {id} = request.params
    //response.json('Borrar reactivo: ' + id)
    const reactivo = await Reactivo.findByPk(id as unknown as number)
    await reactivo.destroy()
    response.json({data: 'Reactivo borrado'})
}