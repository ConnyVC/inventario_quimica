// src/types/categoriaPeligrosidad.ts
import { object, string, number, optional, pipe, nonEmpty, type InferOutput } from 'valibot'

export const CategoriaPeligrosidadSchema = object({
  idCategoria: optional(number()),
  nombreCategoria: pipe(string(), nonEmpty('El nombre es obligatorio')),
  pictograma: pipe(string(), nonEmpty('El pictograma es obligatorio')),
  descripcion: optional(string())
})

export type CategoriaPeligrosidad = InferOutput<typeof CategoriaPeligrosidadSchema>