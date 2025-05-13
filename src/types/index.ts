export interface Producto {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  stock: number
  imagen?: string
  createdAt: string
  updatedAt: string
}

export interface CreateProductoDto {
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  stock: number
  imagen?: string
}

  // src/types/index.ts
export interface CreateUsuarioDto {
  name: string;
  email: string;
  password: string;
}


export interface UpdateProductoDto extends Partial<CreateProductoDto> {}