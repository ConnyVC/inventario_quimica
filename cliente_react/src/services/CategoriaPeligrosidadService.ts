import axiosInstance from './axiosInstance'
import { safeParse } from 'valibot'
import { CategoriaPeligrosidadSchema, type CategoriaPeligrosidad } from '../types/categoriaPeligrosidad'

export async function getCategorias(): Promise<CategoriaPeligrosidad[]> {
  try {
    const { data } = await axiosInstance.get('/categorias')
    const datosArray = Array.isArray(data) ? data : data.data || []
    const categorias: CategoriaPeligrosidad[] = []

    for (const categoria of datosArray) {
      const resultado = safeParse(CategoriaPeligrosidadSchema, categoria)

      if (resultado.success) {
        categorias.push(resultado.output)
      } else {
        console.error('Error al validar categoria:', resultado.issues)
      }
    }

    return categorias
  } catch (error) {
    console.error('Error al obtener categorias:', error)
    return []
  }
}