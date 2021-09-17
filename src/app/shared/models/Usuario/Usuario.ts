import { Ciudad } from "../Atributo/Ciudad"

export class Usuario {
  ciudad: Ciudad;
  direccion: string
  estado: boolean
  id: number
  tipo_usuario: number
  username: string
  envio_fcm: boolean;
  envio_email: boolean;
}

export class RegistroContactoUsuario{
  tipo_contacto: number;
  valor: string;
  usuario_id: number;
}

export class ContactoUsuario{
  id: number;
  tipo_contacto: number;
  valor: string;
  usuario_id: number;
  created_at: Date;
  updated_at: Date;
}

export enum TIPOCONTACTOUSUARIO{
  'Telefono' = 1,
  'Email' = 2,
  'Fax' = 3
}

export enum TIPO_USUARIO{
  'Cliente' = 1,
  'Empleado' = 2,
  'Proveedor' = 3
}