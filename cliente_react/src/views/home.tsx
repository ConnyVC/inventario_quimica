import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

import { getCategorias } from '../services/CategoriaPeligrosidadService'
import { type CategoriaPeligrosidad } from '../types/categoriaPeligrosidad'

import type { Reactivo } from '../types/reactivo'

import { getReactivos } from '../services/ReactivoService'

import ReactivoFila from '../components/ReactivoFila'
import { Link, useLoaderData } from 'react-router-dom'

interface UserTokenPayload {
  idUsuario: number
  correo: string
  idRol: number
  nombreRol: string
}

// Loader que React Router ejecuta antes de renderizar la página
export async function loader() {
  try {
    const reactivos = await getReactivos()
    return Array.isArray(reactivos) ? reactivos : []
  } catch (error) {
    console.error('Error al cargar reactivos en loader:', error)
    return []
  }
}

export default function Home() {
  const [esAdmin, setEsAdmin] = useState<boolean>(false)

  // Estado para almacenar las categorías recibidas de la base de datos
  const [categorias, setCategorias] = useState<CategoriaPeligrosidad[]>([])

  const dataLoader = useLoaderData() as Reactivo[]
  const [reactivos, setReactivos] = useState<Reactivo[]>(
    Array.isArray(dataLoader) ? dataLoader : []
  )

  // Sincroniza el estado local cada vez que el loader vuelva a traer información actualizada
  useEffect(() => {
    if (Array.isArray(dataLoader)) {
     setReactivos(dataLoader)
    }
  }, [dataLoader])

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

  // Cargar Reactivos directamente al montar el componente
  useEffect(() => {
    const cargarDatosReactivos = async () => {
      try {
        const datos = await getReactivos()
        console.log('Reactivos recibidos desde el useEffect:', datos)
        if (Array.isArray(datos) && datos.length > 0) {
          setReactivos(datos)
        }
      } catch (error) {
        console.error('Error al obtener reactivos en Home:', error)
      }
    }

    cargarDatosReactivos()
  }, [])

  // Cargar Categorías desde la API
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await getCategorias()
        setCategorias(data)
      } catch (error) {
        console.error('Error al obtener las categorías de peligrosidad:', error)
      }
    }

    cargarCategorias()
  }, [])

  console.log('Reactivos cargados en el Home:', reactivos)

  // Filtrado dinámico por texto y categoría
  const reactivosFiltrados = reactivos.filter((item) => {
    const texto = busqueda.toLowerCase().trim()

    const nombreQuimico = (item.nombreQuimico || '').toLowerCase()
    const formulaQuimica = (item.formulaQuimica || '').toLowerCase()

    const coincideNombreOFormula =
      nombreQuimico.includes(texto) || formulaQuimica.includes(texto)

    // Usamos Number() para asegurar que los IDs de categoría coincidan sin importar el tipo
    const categoriaEncontrada = categorias.find(
      (cat) => Number(cat.idCategoria) === Number(item.idCategoria)
    )

    const categoriaNombre = categoriaEncontrada ? categoriaEncontrada.nombreCategoria : ''

    const coincideCategoria =
      filtroCategoria === '' || categoriaNombre === filtroCategoria

    return coincideNombreOFormula && coincideCategoria
  })

  // Cálculos dinámicos para las métricas de las tarjetas
  const totalReactivos = reactivos.length
  const stockCriticoCount = reactivos.filter(
    (item) => item.stockReal <= item.puntoCritico
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
{/*
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
*/}
{/*
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
*/}
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
              <Link
                to="/reactivos/crear"
                className="btn btn-primary btn-sm"
              >
                <i className="bi bi-plus-circle me-1"></i> Nuevo Reactivo
              </Link>
{/*              
              <button
                className="btn btn-outline-secondary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalDespacho"
              >
                <i className="bi bi-box-arrow-up-right me-1"></i> Registrar Salida/Despacho
              </button>
*/}
            </div>
          )}
        </div>
        
        {/* Barra de Filtro / Búsqueda */}
        <div className="card-body pt-0">
          <div className="row g-2 mb-3">
            <div className="col-md-6 col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por reactivo o fórmula..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                {/* Botón opcional para limpiar la búsqueda rápido si hay texto */}
                {busqueda && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setBusqueda('')}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <select
                className="form-select form-select-sm"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((cat) => (
                  <option key={cat.idCategoria} value={cat.nombreCategoria}>
                    {cat.nombreCategoria}
                  </option>
                ))}
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
                  <td colSpan={esAdmin ? 8 : 7} className="text-center">No hay reactivos registrados</td>
                </tr>
              ) : (
                reactivosFiltrados.map((item) => {
                // Buscar el nombre de la categoría asociada al reactivo
                const categoriaEncontrada = categorias.find(
                  (cat) => Number(cat.idCategoria) === Number(item.idCategoria)
                )

                return (
                  <ReactivoFila
                    key={item.idReactivo}
                    esAdmin={esAdmin}
                    reactivo={{
                      ...item,
                      categoriaNombre: categoriaEncontrada ? categoriaEncontrada.nombreCategoria : 'Sin Categoría',
                    }}
                  />
                )
                })
              )}
            </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}