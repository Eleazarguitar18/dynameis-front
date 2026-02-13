export interface Actividad {
  id: number;                // Generalmente Serial o BigInt en Postgres
  estado: boolean;           // O string, dependiendo de cómo manejes el activo/inactivo
  id_user_created: number;
  id_user_updated: number | null; // Puede ser null si no ha sido editado
  created_at: string | Date;  // NestJS suele enviarlo como ISO string
  updated_at: string | Date;
  nombre: string;
  descripcion: string;
  puntos_base: number;
  categoria: string;         // Ejemplo: "Deporte", "Cultura", etc.
}