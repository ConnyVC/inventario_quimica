import { 
  Form, 
  Link, 
  useActionData, 
  useLoaderData, 
  redirect, 
  type ActionFunctionArgs, 
  type LoaderFunctionArgs 
} from 'react-router-dom'
import { getCategorias } from '../services/CategoriaPeligrosidadService'
import { getReactivoById, reactivoEditar } from '../services/ReactivoService'
import type { CategoriaPeligrosidad } from '../types/categoriaPeligrosidad'
import type { Reactivo } from '../types/reactivo'

// 1. Loader: carga tanto el reactivo actual como la lista de categorías
export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    return redirect('/')
  }

  const [reactivo, categorias] = await Promise.all([
    getReactivoById(params.id),
    getCategorias()
  ])

  if (!reactivo) {
    return redirect('/')
  }

  return { reactivo, categorias }
}

// 2. Action: procesa la actualización vía PUT
export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.id) {
    return redirect('/')
  }

  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const respuesta = await reactivoEditar(data, Number(params.id))
  if (respuesta.success) {
    return redirect('/')
  }

  return respuesta.error
}

export default function ReactivosEditar() {
  const { reactivo, categorias } = useLoaderData() as { reactivo: Reactivo; categorias: CategoriaPeligrosidad[] }
  const error = useActionData() as string

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Modificar Reactivo</h2>
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
              defaultValue={reactivo.nombreQuimico}
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
              defaultValue={reactivo.formulaQuimica || ''}
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
                defaultValue={reactivo.unidadMedida}
                required
              >
                <option value="g">Gramos (g)</option>
                <option value="kg">Kilogramos (kg)</option>
                <option value="ml">Mililitros (ml)</option>
                <option value="L">Litros (L)</option>
              </select>
            </div>

            {/* Categoría de Peligrosidad */}
            <div className="col-md-6 mb-3">
              <label htmlFor="idCategoria" className="form-label">
                Categoría de Peligrosidad:
              </label>
              <select
                id="idCategoria"
                name="idCategoria"
                className="form-select"
                defaultValue={String(reactivo.idCategoria)}
                required
              >
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
            {/* Cantidad Disponible */}
            <div className="col-md-6 mb-3">
              <label htmlFor="cantidadDisponible" className="form-label">
                Cantidad Disponible:
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="cantidadDisponible"
                name="cantidadDisponible"
                className="form-control"
                defaultValue={reactivo.cantidadDisponible}
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
                defaultValue={reactivo.puntoReordenMinimo}
                required
              />
            </div>
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Guardar Cambios
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}