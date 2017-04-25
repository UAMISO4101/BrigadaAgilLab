import {Usuario} from "./usuario"

export interface Experimento{
    id: string;
    experimento: string;
    objetivo: string;
    fecha: string;
    descripcion:string;
    insumos:string;
    asistentes:Usuario[];
}
