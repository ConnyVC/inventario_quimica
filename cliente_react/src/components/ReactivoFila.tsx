import { useNavigate, Form, redirect, type ActionFunctionArgs } from 'react-router-dom'
import { reactivoBorrar } from '../services/ReactivoService'
import type { Reactivo } from '../types/reactivo'

type ReactivoFilaProps = {
  reactivo: Reactivo & {
    categoriaNombre?: string
  }
  esAdmin?: boolean
}

// Action que procesa el borrado
export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    const respuesta = await reactivoBorrar(Number(params.id))
    if (!respuesta.success) {
      console.error(respuesta.error)
      return { error: respuesta.error }
    }
  }
  return redirect('/')
}

export default function ReactivoFila({ reactivo, esAdmin = true }: ReactivoFilaProps) {
  const navigate = useNavigate()

  // Extraer valores con soporte camelCase
  const stock = Number(reactivo.stockReal ?? reactivo.cantidadDisponible ?? 0)
  const puntoCritico = Number(reactivo.puntoCritico ?? reactivo.puntoReordenMinimo ?? 0)
  const unidad = reactivo.unidadMedida || 'unid'
  const categoria = reactivo.categoriaNombre || reactivo.categoriaPeligrosidad || 'Sin Categoría'

  // Evaluar estado de alerta
  const esCritico = stock <= puntoCritico
  const estadoAlerta = esCritico ? 'Crítico' : 'Óptimo'

  return (
    <tr>
      {/* 1. CÓD. */}
      <td>{reactivo.idReactivo}</td>

      {/* 2. NOMBRE QUÍMICO */}
      <td className="fw-bold">{reactivo.nombreQuimico}</td>

      {/* 3. FÓRMULA */}
      <td><code>{reactivo.formulaQuimica || '—'}</code></td>

      {/* 4. PELIGROSIDAD */}
      <td>
        <span className="badge bg-secondary">{categoria}</span>
      </td>

      {/* 5. STOCK REAL */}
      <td>
        <span className={esCritico ? 'text-danger fw-bold' : ''}>
          {stock} {unidad}
        </span>
      </td>

      {/* 6. PTO. CRÍTICO */}
      <td>
        {puntoCritico} {unidad}
      </td>

      {/* 7. ESTADO ALERTA */}
      <td>
        <span className={`badge ${esCritico ? 'bg-danger' : 'bg-success'}`}>
          {estadoAlerta}
        </span>
      </td>

      {/* 8. ACCIONES */}
      {esAdmin && (
        <td className="text-end">
          <div className="d-flex justify-content-end gap-2">
            {/* Botón Editar */}
            <button
              type="button"
              className="btn btn-sm btn-info text-white"
              onClick={() => navigate(`/reactivos/${reactivo.idReactivo}/editar`)}
            >
              Editar
            </button>

            {/* Formulario y Botón Eliminar */}
            <Form
              method="POST"
              action={`/reactivos/${reactivo.idReactivo}/eliminar`}
              onSubmit={(e) => {
                const confirmado = confirm('¿Deseas eliminar este reactivo?')
                if (!confirmado) {
                  e.preventDefault()
                } else {
                  // Forzar recarga de la página tras la confirmación
                  setTimeout(() => {
                    window.location.reload()
                  }, 300)
                }
              }}
            >
              <button type="submit" className="btn btn-sm btn-danger">
                Eliminar
              </button>
            </Form>
          </div>
        </td>
      )}
    </tr>
  )
}