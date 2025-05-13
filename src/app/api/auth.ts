
import axios from 'axios';

// Solución para variables de entorno en Next.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define el tipo CreateUsuarioDto en el frontend
interface CreateUsuarioDto {
  name: string;
  email: string;
  password: string;
}

export const authApi = {
  register: async (userData: CreateUsuarioDto) => {
    return axios.post(`${API_URL}/usuarios`, userData);
  },
  
  login: async (credentials: { email: string; password: string }) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
  },
};