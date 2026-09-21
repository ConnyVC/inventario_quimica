import { Form, redirect, useActionData, type ActionFunctionArgs } from 'react-router-dom';
import { login } from '../services/UsuarioService';

export async function action({request}:ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData())
    const resultado = await login(formData)
    if(!resultado.success){
        return resultado
    }
    return redirect('/')
}

export default function Login() {
    const actionData = useActionData() as {
        success?: boolean,
        error?: string,
        detalleErrores?: {[key:string]:string[]}
    }
  return (
    <div className="bg-light d-flex align-items-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-4 text-center">
                {/* Escudo Institucional */}
                <div className="mb-3">
                  <img 
                    src="/public/Logo_UTFSM.png" 
                    alt="Escudo USM" 
                    style={{ height: '70px', objectFit: 'contain' }} 
                  />
                </div>

                <h4 className="fw-bold mb-1">Inventario Químico</h4>
                <p className="text-muted small mb-4">Depto. de Química y Medio Ambiente</p>

                {/* MENSAJES ERROR */}
                {actionData?.error && (
                    <div className="alert alert-danger" role="alert">
                        {actionData.error}
                    </div>
                )}

                {/* FORMULARIO */}
                <Form method="post" id="loginForm">
                  {/* Campo Correo */}
                  <div className="form-floating mb-3 text-start">
                    <input 
                      type="email" 
                      name="correo"
                      className={`form-control ${actionData?.detalleErrores?.correo ? 'is-invalid' : ''}`} 
                      id="correoInput" 
                      placeholder="nombre@usm.cl" 
                    
                    />
                    {'correo' in (actionData?.detalleErrores || {}) && (
                        <div className="invalid-feedback">
                            {actionData.detalleErrores?.correo[0]}
                        </div>
                    )}

                    <label htmlFor="correoInput">Correo Institucional</label>
                  </div>

                  {/* Campo Contraseña */}
                  <div className="form-floating mb-4 text-start">
                    <input 
                      type="password"
                      name="password"
                      className={`form-control ${actionData?.detalleErrores?.password ? 'is-invalid' : ''}`} 
                      id="passInput" 
                      placeholder="Contraseña" 
                      
                    />
                    {'password' in (actionData?.detalleErrores || {}) && (
                        <div className="invalid-feedback">
                            {actionData.detalleErrores?.password[0]}
                        </div>
                    )}
                    <label htmlFor="passInput">Contraseña</label>
                  </div>

                  {/* Botón Iniciar Sesión */}
                  <button className="btn btn-primary w-100 py-2 fw-semibold" type="submit">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Iniciar Sesión
                  </button>
                </Form>
              </div>
            </div>
            <p className="text-center text-muted small mt-3">USM Sede Viña del Mar</p>
          </div>
        </div>
      </div>
    </div>
  )
}