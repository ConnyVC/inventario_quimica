import { Form, Link, useActionData, useLoaderData, redirect, type ActionFunctionArgs } from 'react-router-dom'
import { getCategorias } from '../services/CategoriaPeligrosidadService'
import { reactivoCrear } from '../services/ReactivoService'
import type { CategoriaPeligrosidad } from '../types/categoriaPeligrosidad'

// 1. Loader para traer las categorías de la base de datos
export async function loader() {
  const categorias = await getCategorias()
  return categorias
}

// 2. Action para procesar los datos enviados por el Form
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const respuesta = await reactivoCrear(data)
  if (respuesta.success) {
    return redirect('/')
  }
  return respuesta.error
}

export default function ReactivosCrear() {
  const categorias = useLoaderData() as CategoriaPeligrosidad[]
  const error = useActionData() as string

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Crear Reactivo</h2>
        <Link to="/" className="btn btn-secondary">
          Volver
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card shadow-sm p-4">
        <Form method="POST">
          {/* Nombre Químico */}
          <div className="mb-3">
            <label htmlFor="nombreQuimico" className="form-label">
              Nombre Químico:
            </label>
            <input
              type="text"
              id="nombreQuimico"
              name="nombreQuimico"
              className="form-control"
              placeholder="Ej: Ácido Sulfúrico"
              required
            />
          </div>

          {/* Fórmula Química */}
          <div className="mb-3">
            <label htmlFor="formulaQuimica" className="form-label">
              Fórmula Química:
            </label>
            <input
              type="text"
              id="formulaQuimica"
              name="formulaQuimica"
              className="form-control"
              placeholder="Ej: H2SO4"
            />
          </div>

          <div className="row">
            {/* Unidad de Medida */}
            <div className="col-md-6 mb-3">
              <label htmlFor="unidadMedida" className="form-label">
                Unidad de Medida:
              </label>
              <select
                id="unidadMedida"
                name="unidadMedida"
                className="form-select"
                defaultValue=""
                required
              >
                <option value="" disabled>-- Selecciona una unidad --</option>
                <option value="g">Gramos (g)</option>
                <option value="kg">Kilogramos (kg)</option>
                <option value="ml">Mililitros (ml)</option>
                <option value="L">Litros (L)</option>
              </select>
            </div>

            {/* Categoría de Peligrosidad (desde MySQL) */}
            <div className="col-md-6 mb-3">
              <label htmlFor="idCategoria" className="form-label">
                Categoría de Peligrosidad:
              </label>
              <select
                id="idCategoria"
                name="idCategoria"
                className="form-select"
                defaultValue=""
                required
              >
                <option value="" disabled>-- Selecciona una categoría --</option>
                {categorias.map((cat) => {
                  const id = cat.idCategoria
                  const nombre = cat.nombreCategoria
                  return (
                    <option key={String(id)} value={id}>
                      {nombre}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="row">
            {/* Cantidad Inicial */}
            <div className="col-md-6 mb-3">
              <label htmlFor="cantidadDisponible" className="form-label">
                Cantidad Inicial Disponible:
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="cantidadDisponible"
                name="cantidadDisponible"
                className="form-control"
                placeholder="Ej: 100"
                required
              />
            </div>

            {/* Punto de Reorden Mínimo */}
            <div className="col-md-6 mb-3">
              <label htmlFor="puntoReordenMinimo" className="form-label">
                Punto de Reorden Mínimo:
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="puntoReordenMinimo"
                name="puntoReordenMinimo"
                className="form-control"
                placeholder="Ej: 10"
                required
              />
            </div>
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Agregar Reactivo
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}