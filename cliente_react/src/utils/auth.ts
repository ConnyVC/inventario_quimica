import { jwtDecode } from 'jwt-decode';

export interface UserTokenPayload {
  idUsuario: number;
  correo: string;
  idRol: number; // 1: Admin, 2: Docente
  nombreRol: string;
}

export function getUsuarioAutenticado(): UserTokenPayload | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<UserTokenPayload>(token);
    return decoded;
  } catch (error) {
    return null;
  }
}