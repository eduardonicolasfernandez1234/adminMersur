export class RegistroCliente{
    username: string;
    password: string;
    direccion: string;
    estado?: boolean;
    ciudad_id: number;
    creador_id: number;
    razon_social: string;
    identificacion_tributaria: string;
    representante_legal?: string;
    referencia_comercial?: string;
    certificaciones?: string;
    productos_importacion?: string;
    origen_importacion?: string;
    proveedores_logisticos?: string;
    resultado_cnat?: string;
}