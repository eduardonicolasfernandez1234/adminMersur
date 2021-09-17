import { Usuario } from "../Usuario";

export class Proveedor{
  id: number;
  razon_social: string;
  nit: string;
  tipo_proveedor: string;
  agencia: string;
  usuario: number;
  created_at: Date;
  updated_at: Date;
}

export class ProveedorInfo{
  id: number;
  razon_social: string;
  nit: string;
  tipo_proveedor: string;
  agencia: string;
  usuario: Usuario;
  created_at: Date;
  updated_at: Date;
}
