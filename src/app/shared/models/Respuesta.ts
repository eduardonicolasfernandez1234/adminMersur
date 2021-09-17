export interface Respuesta{
    res: string;
    data: any;
}

export enum ESTADO_LISTA{
    "registrar" = 1,
    "actualizar" = 2,
    "replicar" = 3
}