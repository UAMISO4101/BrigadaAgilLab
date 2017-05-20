/**
 * Created by alejandroquintero on 23/03/17.
 */
export interface Protocolo {
    id: number;
    nombre: string;
    fecha: string;
    version: string;
    proceso: Array<Etapa>;
}

export interface Etapa {
    nombre: string;
    pasos: Array<string>;
}

