import { NavLink, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

// Interfaz para tipar el contenido del Token JWT
interface UserTokenPayload {
  idUsuario: number;
  correo: string;
  idRol: number;       // 1 = Administrador, 2 = Docente
  nombreRol: string;  // "Administrador" o "Docente (Solo Lectura)"
}

export default function NavBar() {
  const navigate = useNavigate()

  // Leer y decodificar el Token almacenado en localStorage
  const token = localStorage.getItem('token')
  let usuario: UserTokenPayload | null = null

  if (token) {
    try {
      usuario = jwtDecode<UserTokenPayload>(token)
    } catch (error) {
      console.error('Error al decodificar el token:', error)
    }
  }

  // Evaluar si el usuario actual es Administrador (Suponiendo idRol === 1)
  const esAdmin = usuario?.idRol === 1

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container-fluid px-4">
        <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
          <i className="bi bi-radioactive text-warning fs-4"></i>
          <span>Gestión de Reactivos</span>
        </NavLink>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Rutas accesibles para TODOS los roles */}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/"
              >
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/catalogo"
              >
                <i className="bi bi-flask me-1"></i> Catálogo
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/alertas"
              >
                <i className="bi bi-exclamation-triangle me-1"></i> Alertas
              </NavLink>
            </li>

            {/* Opciones exclusivas de Administrador */}
            {esAdmin && (
              <>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                    to="/movimientos"
                  >
                    <i className="bi bi-arrow-left-right me-1"></i> Movimientos
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                    to="/reportes"
                  >
                    <i className="bi bi-file-earmark-bar-graph me-1"></i> Reportes
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                    to="/usuarios"
                  >
                    <i className="bi bi-people me-1"></i> Usuarios
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Perfil y Salir */}
          <div className="d-flex align-items-center gap-3">
            <span 
              className={`badge py-2 px-3 ${esAdmin ? 'bg-secondary' : 'bg-info text-dark'}`} 
              id="roleBadge"
            >
              Perfil: {usuario?.nombreRol || (esAdmin ? 'Administrador' : 'Docente (Solo Lectura)')}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}