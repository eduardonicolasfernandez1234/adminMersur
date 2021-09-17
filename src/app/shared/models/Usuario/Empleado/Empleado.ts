import { Usuario } from "../Usuario";

export class Empleado {
  id: number;
  ci: string;
  estado_civil: string;
  fecha_nacimiento: string;
  interno: boolean;
  nacionalidad: string;
  nombre_completo: string;
  usuario: number;
  created_at: Date;
  updated_at: Date;
}

export class EmpleadoInfo {
  id: number;
  ci: string;
  usuario: Usuario;
  estado_civil: string;
  fecha_nacimiento: string;
  interno: boolean;
  nacionalidad: string;
  nombre_completo: string;
  created_at: string;
  updated_at: string;
}