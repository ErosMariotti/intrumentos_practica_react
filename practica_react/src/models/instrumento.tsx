export interface Instrumento {
  id: string
  cantidadVendida: string
  costoEnvio: string
  descripcion: string
  imagen: string
  instrumento: string
  marca: string
  modelo: string
  precio: string
  categoria: { id: number }
}