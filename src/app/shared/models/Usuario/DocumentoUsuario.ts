export class DocumentoUsuario{
    id: number;
    tipo: number;
    valor: string;
    fecha_documento: Date;
    path_documento: string;
    usuario_id: number;
    created_at: Date;
    updated_at: Date;
}

export enum TIPODOCUMENTOUSUARIO{
    'Nit' = 1,
    'Fundempresa' = 2,
    'Resolución administrativa' = 3,
    "Matricula" = 4,
    "Otros" = 5,
}