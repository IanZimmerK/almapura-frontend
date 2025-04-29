export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: string; // Opcional (para imágenes)
    categoria?: string;
  }