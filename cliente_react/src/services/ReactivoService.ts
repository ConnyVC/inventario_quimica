import axiosInstance from './axiosInstance'
import { safeParse } from 'valibot'
import {
  ReactivoFormSchema,
  type ReactivoFormData,
  type Reactivo
} from '../types/reactivo'

// Obtener Reactivos (GET)
export async function getReactivos(): Promise<Reactivo[]> {
  try {
    const respuesta = await axiosInstance.get('/reactivos')
    
    // 🔍 Revisa esta salida en la consola de tu navegador
    console.log('Respuesta completa de Axios (/reactivos):', respuesta)

    const data = respuesta.data
    const datosArray = Array.isArray(data) ? data : (data?.data || data?.reactivos || [])

    const reactivosMapeados = datosArray.map((item: any) => ({
      idReactivo: item.idReactivo ?? item.id_reactivo ?? item.id,
      nombreQuimico: item.nombreQuimico ?? item.nombre_quimico ?? '',
      formulaQuimica: item.formulaQuimica ?? item.formula_quimica ?? '',
      idCategoria: Number(item.idCategoria ?? item.id_categoria ?? 0),
      categoriaPeligrosidad: item.categoriaPeligrosidad ?? item.categoria_peligrosidad ?? item.categoria ?? '',
      stockReal: Number(item.stockReal ?? item.stock_real ?? item.cantidadDisponible ?? item.cantidad_disponible ?? 0),
      unidadMedida: item.unidadMedida ?? item.unidad_medida ?? 'unid',
      puntoCritico: Number(item.puntoCritico ?? item.punto_critico ?? item.puntoReordenMinimo ?? item.punto_reorden_minimo ?? 0),
      estadoAlerta: item.estadoAlerta ?? item.estado_alerta ?? 'Óptimo'
    }))

    return reactivosMapeados as Reactivo[]
  } catch (error) {
    console.error('Error en la petición GET /reactivos:', error)
    return []
  }
}

// Obtener un reactivo por ID (GET)
export async function getReactivoById(id: string | number): Promise<Reactivo | null> {
  try {
    const { data } = await axiosInstance.get(`/reactivos/${id}`)
    // Si la API devuelve { data: {...} } o el objeto directo
    const reactivoData = data.data ? data.data : data
    return reactivoData as Reactivo
  } catch (error) {
    console.error(`Error al obtener el reactivo con ID ${id}:`, error)
    return null
  }
}

// Crear Reactivo (POST)
export async function reactivoCrear(formData: ReactivoFormData) {
  try {
    const resultado = safeParse(ReactivoFormSchema, {
      nombreQuimico: formData.nombreQuimico,
      formulaQuimica: formData.formulaQuimica || '',
      unidadMedida: formData.unidadMedida,
      puntoReordenMinimo: Number(formData.puntoReordenMinimo),
      idCategoria: Number(formData.idCategoria),
      cantidadDisponible: Number(formData.cantidadDisponible)
    })

    if (resultado.success) {
      await axiosInstance.post('/reactivos', resultado.output)
      return { success: true }
    } else {
      return { success: false, error: 'Hay un problema con los datos del formulario.' }
    }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'No se pudo crear el reactivo' }
  }
}

// Editar Reactivo (PUT)
export async function reactivoEditar(formData: ReactivoFormData, reactivoId: number) {
  try {
    const resultado = safeParse(ReactivoFormSchema, {
      nombreQuimico: formData.nombreQuimico,
      formulaQuimica: formData.formulaQuimica || '',
      unidadMedida: formData.unidadMedida,
      puntoReordenMinimo: Number(formData.puntoReordenMinimo),
      idCategoria: Number(formData.idCategoria),
      cantidadDisponible: Number(formData.cantidadDisponible)
    })

    if (resultado.success) {
      await axiosInstance.put(`/reactivos/${reactivoId}`, resultado.output)
      return { success: true }
    } else {
      return { success: false, error: 'Datos no válidos' }
    }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'No se pudo editar el reactivo' }
  }
}

// Eliminar Reactivo (DELETE)
export async function reactivoBorrar(reactivoId: number) {
  try {
    await axiosInstance.delete(`/reactivos/${reactivoId}`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'No se pudo eliminar el reactivo' }
  }
}

