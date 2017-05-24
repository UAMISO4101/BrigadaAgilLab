/**
 * Created by alejandroquintero on 23/03/17.
 */
export interface Protocolo {
    id: number;
    identificador: string;
    nombre: string;
    descripcion: string;
    fecha_creacion: string;
    fecha_modificacion: string;
    version: string;
    id_version: number;
    proceso: Array<Etapa>;
    textoProceso: string;
}

export interface Etapa {
    nombre: string;
    pasos: Array<string>;
}

