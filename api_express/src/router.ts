import { Router } from "express";
import { borrarReactivo, crearReactivo, editarReactivo, getReactivoById, getReactivos, getReactivosConCantidad, getReactivosConCategoria } from "./handlers/reactivos";
import { borrarCategoria, crearCategoria, editarCategoria, getCategoriaById, getCategoriasPeligrosidad, getCategoriasConCantidadReactivos } from "./handlers/categoriasPeligrosidad";
import { crearUsuario, login } from "./handlers/usuarios";
import { verificarToken } from "./middleware/verificarToken";

const router = Router()

//Login
router.post('/login', login)

//Middleware desde el cual se verificará el token en las rutas que lo requieran
router.use(verificarToken)

// Reactivos
router.get('/reactivos', getReactivos)
router.get('/reactivos/con-cantidad', getReactivosConCantidad)
router.get('/reactivos/con-categoria', getReactivosConCategoria)
router.get('/reactivos/:id', getReactivoById)
router.post('/reactivos', crearReactivo)
router.put('/reactivos/:id', editarReactivo)
router.delete('/reactivos/:id', borrarReactivo)

// Categorias de peligrosidad
router.get('/categorias', getCategoriasPeligrosidad)
router.get('/categorias/con-cantidad', getCategoriasConCantidadReactivos)
router.get('/categorias/:id', getCategoriaById)
router.post('/categorias', crearCategoria)
router.put('/categorias/:id', editarCategoria)
router.delete('/categorias/:id', borrarCategoria)

//Usuarios
router.post('/usuarios/crear', crearUsuario)



export default router