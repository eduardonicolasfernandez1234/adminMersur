import { Usuario } from '../Usuario';
import { DocumentoUsuario } from '../DocumentoUsuario';
export class Cliente{
    id: number;
    razon_social: string;
    identificacion_tributaria: string;
    representante_legal: string;
    direccion: string;
    referencia_comercial: string;
    certificaciones: string;
    productos_importacion: string;
    origen_importacion: string;
    proveedores_logisticos: string;
    resultado_cnat: string;
    usuario: number;
    creador_id: number;
    created_at: Date;
    updated_at: Date;
}

export class ClienteInfo{
    id: number;
    razon_social: string;
    identificacion_tributaria: string;
    representante_legal: string;
    direccion: string;
    referencia_comercial: string;
    certificaciones: string;
    productos_importacion: string;
    origen_importacion: string;
    proveedores_logisticos: string;
    resultado_cnat: string;
    usuario: Usuario;
    creador_id: number;
    created_at: Date;
    updated_at: Date;
}

export class ClienteContacto{
    id: number;
    nombre_completo: string;
    email: string;
    telefono: string;
    acceso_crm: string;
    tipo: number;
    cliente_id: number;
    created_at: Date;
    updated_at: Date;
}

export class RegistroClienteContacto{
    nombre_completo: string;
    email: string;
    telefono: string;
    acceso_crm: string;
    tipo: number;
    cliente_id: number;
}

export class ClientePlataforma{
    id: number;
    nombre_plataforma: string;
    usuario: string;
    password: string;
    token: string;
    cliente_id: number;
    created_at: Date;
    updated_at: Date;
}

export class RegistroClientePlataforma{
    nombre_plataforma: string;
    usuario: string;
    password: string;
    token: string;
    cliente_id: number;
}

export class ClienteUsuarioCompleto{
    id: number;
    razon_social: string;
    identificacion_tributaria: string;
    representante_legal: string;
    direccion: string;
    referencia_comercial: string;
    certificaciones: string;
    productos_importacion: string;
    origen_importacion: string;
    proveedores_logisticos: string;
    resultado_cnat: string;
    usuario_id: number;
    usuario: Usuario;
    creador_id: number;
    created_at: Date;
    updated_at: Date;
    contacto_cliente?: ClienteContacto[];
    plataforma_cliente?: ClientePlataforma[];
    documento_usuario: DocumentoUsuario[];
}


export enum CONTACTOLOGISTICA{
    'Gerente general' = 1,
    'Responsable comex' = 2,
    'Responsable contable' = 3,
    'Responsable almacen' = 4
}