export interface Puntuacion {
  id: number;                // Generalmente Serial o BigInt en Postgres
  estado: boolean;           // O string, dependiendo de cómo manejes el activo/inactivo
  id_user_created: number;
  id_user_updated: number | null; // Puede ser null si no ha sido editado
  created_at: string | Date;  // NestJS suele enviarlo como ISO string
  updated_at: string | Date;
  id_grupo: number;          // Relación con Grupo
  id_actividad: number;      // Relación con Actividad
  puntos_obtenidos: number;   // Puntos obtenidos por el grupo en esa actividad
}