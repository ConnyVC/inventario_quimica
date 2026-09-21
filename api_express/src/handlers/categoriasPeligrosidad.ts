import { Request, Response } from "express"
import Categoria from "../models/CategoriaPeligrosidad"
import { Sequelize } from "sequelize"
import Reactivo from "../models/Reactivo"


//Lista todas las categorias
export const getCategoriasPeligrosidad = async(request:Request,response:Response)=>{
    //response.json('Listar categorias')
    //const categorias = await Categoria.findAll()
    const categorias = await Categoria.findAll({
        order: [
            ['nombreCategoria', 'ASC']
        ]
    })
    response.json({data: categorias})
}

//Lista categorias con cantidad de reactivos asociados

export const getCategoriasConCantidadReactivos = async (request: Request, response: Response) => {
    const categorias = await Categoria.findAll({
      attributes: [
        'idCategoria',
        'nombreCategoria',
        [Sequelize.fn('COUNT', Sequelize.col('reactivos.id_reactivo')), 'cantidadReactivos']
      ],
      include: [
        {
          model: Reactivo,
          required: false,
          attributes: []
        }
      ],
      // Agrupamos por la clave primaria física
      group: ['Categoria.id_categoria'],
      order: [
        ['nombreCategoria', 'ASC']
      ]
    })
    response.json({ data: categorias })
}

//Lista info de una categoria segun su id
export const getCategoriaById = async(request:Request,response:Response)=>{
    const {id} = request.params
    //response.json('Listar categoria: ' + id)
    const categoria = await Categoria.findByPk(id as unknown as number, {
        include: [
            {
                model: Reactivo,
                attributes: ['idReactivo', 'nombreQuimico','cantidad_disponible'],
                required: false
            }
        ]
    })
    response.json({data: categoria})
}

//Crear una categoria
export const crearCategoria = async(request:Request,response:Response)=>{
    response.json('Crear nueva categoria')
}

//Editar una categoria
export const editarCategoria = async(request:Request,response:Response)=>{
    const {id} = request.params
    response.json('Editar categoria: ' + id)
}

//Borra una categoria
export const borrarCategoria = async(request:Request,response:Response)=>{
    const {id} = request.params
    response.json('Borrar categoria: ' + id)
}