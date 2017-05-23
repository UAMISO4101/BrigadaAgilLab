/**
 * Created by alejandroquintero on 23/03/17.
 */
export interface Protocolo {
    id: number;
    identificador: string;
    nombre: string;
    descripcion: string;
    fecha_creacion: string;
    version: string;
    proceso: Array<Etapa>;
}

export interface Etapa {
    nombre: string;
    pasos: Array<string>;
}

