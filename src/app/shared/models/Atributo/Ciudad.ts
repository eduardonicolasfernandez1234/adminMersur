export class Pais{
    id: number;
    nombre: string;
    created_at: Date;
    updated_at: Date;
}

export class Ciudad{
    id: number;
    nombre: string;
    pais_id?: number;
    pais?: Pais;
    created_at: Date;
    updated_at: Date;
}