import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

interface UserTokenPayload {
  idUsuario: number
  correo: string
  idRol: number
  nombreRol: string
}

interface Reactivo {
  idReactivo: number
  nombreQuimico: string
  formulaQuimica: string
  categoriaPeligrosidad: string
  stockReal: number
  unidadMedida: string
  puntoCritico: number
  estadoAlerta: 'Óptimo' | 'Bajo Reorden' | 'Crítico'
}

export default function Home() {
  const [esAdmin, setEsAdmin] = useState<boolean>(false)
  const [reactivos, setReactivos] = useState<Reactivo[]>([])
  const [busqueda, setBusqueda] = useState<string>('')
  const [filtroCategoria, setFiltroCategoria] = useState<string>('')

  // Verificar el Rol del Usuario al cargar la vista
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode<UserTokenPayload>(token)
        setEsAdmin(decoded.idRol === 1) // 1 = Administrador
      } catch (error) {
        console.error('Error al decodificar el token:', error)
      }
    }
  }, [])

  // Filtrado dinámico por texto y categoría
  const reactivosFiltrados = reactivos.filter((r) => {
    const coincideTexto =
      r.nombreQuimico.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.formulaQuimica.toLowerCase().includes(busqueda.toLowerCase())

    const coincideCategoria =
      filtroCategoria === '' || r.categoriaPeligrosidad === filtroCategoria

    return coincideTexto && coincideCategoria
  })

  // Métricas calculadas dinámicamente
  const totalReactivos = reactivos.length
  const stockCriticoCount = reactivos.filter(
    (r) => r.estadoAlerta === 'Bajo Reorden' || r.estadoAlerta === 'Crítico'
  ).length

  return (
    <main className="container-fluid px-4 py-4">
      {/* TARJETAS MÉTRICAS */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body d-flex align-items-center">
              <div className="metric-icon bg-primary-subtle text-primary me-3 rounded-circle p-3">
                <i className="bi bi-boxes fs-3"></i>
              </div>
              <div>
                <p className="text-muted small mb-0">Total Reactivos Activos</p>
                <h4 className="fw-bold mb-0">{totalReactivos}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body d-flex align-items-center">
              <div className="metric-icon bg-danger-subtle text-danger me-3 rounded-circle p-3">
                <i className="bi bi-exclamation-triangle-fill fs-3"></i>
              </div>
              <div>
                <p className="text-muted small mb-0">Stock Crítico</p>
                <h4 className="fw-bold mb-0 text-danger">{stockCriticoCount}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body d-flex align-items-center">
              <div className="metric-icon bg-warning-subtle text-warning me-3 rounded-circle p-3">
                <i className="bi bi-calendar-x fs-3"></i>
              </div>
              <div>
                <p className="text-muted small mb-0">Lotes Próximos a Vencer (&le; 30d)</p>
                <h4 className="fw-bold mb-0 text-warning">2</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body d-flex align-items-center">
              <div className="metric-icon bg-success-subtle text-success me-3 rounded-circle p-3">
                <i className="bi bi-mortarboard-fill fs-3"></i>
              </div>
              <div>
                <p className="text-muted small mb-0">Asignaturas Activas</p>
                <h4 className="fw-bold mb-0">4</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN INVENTARIO */}
      <section id="inventarioSection" className="card border-0 shadow-sm rounded-3 mb-4">
        <div className="card-header bg-white py-3 border-0 d-flex flex-wrap align-items-center justify-content-between gap-2">
          <h5 className="fw-bold mb-0">
            <i className="bi bi-flask text-primary me-2"></i>Catálogo General de Reactivos
          </h5>

          {/* Botones de acción (Exclusivos de Administrador) */}
          {esAdmin && (
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalNuevoReactivo"
              >
                <i className="bi bi-plus-circle me-1"></i> Nuevo Reactivo
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalDespacho"
              >
                <i className="bi bi-box-arrow-up-right me-1"></i> Registrar Salida/Despacho
              </button>
            </div>
          )}
        </div>

        {/* Barra de Filtro / Búsqueda */}
        <div className="card-body pt-0">
          <div className="row g-2 mb-3">
            <div className="col-md-6 col-lg-4">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por reactivo o fórmula..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <select
                className="form-select form-select-sm"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                <option value="Mortal">Mortal</option>
                <option value="Corrosivo">Corrosivo</option>
                <option value="Atención">Atención</option>
                <option value="Nocivo">Nocivo</option>
              </select>
            </div>
          </div>

          {/* Tabla de Datos */}
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="small text-muted text-uppercase">
                  <th>Cód.</th>
                  <th>Nombre Químico</th>
                  <th>Fórmula</th>
                  <th>Peligrosidad</th>
                  <th>Stock Real</th>
                  <th>Pto. Crítico</th>
                  <th>Estado Alerta</th>
                  {/* Columna Acciones (Solo para Admin) */}
                  {esAdmin && <th className="text-end">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {reactivosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={esAdmin ? 8 : 7} className="text-center py-4 text-muted">
                      No se encontraron reactivos registrados
                    </td>
                  </tr>
                ) : (
                  reactivosFiltrados.map((item) => (
                    <tr key={item.idReactivo}>
                      <td>{item.idReactivo}</td>
                      <td className="fw-semibold">{item.nombreQuimico}</td>
                      <td><code>{item.formulaQuimica}</code></td>
                      <td>
                        <span className="badge bg-dark">{item.categoriaPeligrosidad}</span>
                      </td>
                      <td>{`${item.stockReal} ${item.unidadMedida}`}</td>
                      <td>{`${item.puntoCritico} ${item.unidadMedida}`}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.estadoAlerta === 'Óptimo'
                              ? 'bg-success'
                              : 'bg-danger'
                          }`}
                        >
                          {item.estadoAlerta}
                        </span>
                      </td>
                      {/* Acciones (Eliminar/Editar) */}
                      {esAdmin && (
                        <td className="text-end">
                          <button className="btn btn-outline-danger btn-sm border-0">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}