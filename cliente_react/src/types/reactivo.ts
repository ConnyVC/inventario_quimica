import { object, string, number, array, nullable, optional, union } from 'valibot'

// Permite number o string (por el formato "2.50" de la base de datos)
const NumberOrString = union([number(), string()])

export interface Reactivo {
  idReactivo: number | string
  nombreQuimico: string
  formulaQuimica?: string | null
  idCategoria: number | string
  categoriaPeligrosidad?: string
  stockReal: number
  unidadMedida: string
  puntoCritico: number
  estadoAlerta?: 'Óptimo' | 'Bajo Reorden' | 'Crítico'
  cantidadDisponible?: number
  puntoReordenMinimo?: number
}

export const ReactivoFormSchema = object({
  nombreQuimico: string(),
  formulaQuimica: optional(nullable(string())),
  unidadMedida: string(),
  puntoReordenMinimo: NumberOrString,
  idCategoria: NumberOrString,
  cantidadDisponible: NumberOrString
})

export const ReactivoSchema = object({
  idReactivo: NumberOrString,
  nombreQuimico: string(),
  formulaQuimica: optional(nullable(string())),
  unidadMedida: string(),
  puntoReordenMinimo: NumberOrString,
  idCategoria: NumberOrString,
  cantidadDisponible: NumberOrString,
  estado: optional(nullable(NumberOrString))
})

export const ReactivosSchema = array(ReactivoSchema)

export type ReactivoFormData = {
  [k: string]: FormDataEntryValue
}