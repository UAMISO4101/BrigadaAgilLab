import {Injectable} from '@angular/core';

export const LABELS = {
    tit_inicio: "Inicio",
    tit_proyectos: "Proyectos",
    tit_proyecto: "Proyecto",
    tit_nuevo_proyecto: "Nuevo Proyecto",
    tit_todos_proyectos: "Todos los Proyectos",
    cmp_nombre: "Nombre",
    cmp_identificador: "Identificador",
    cmp_descripcion: "Descripción",
    cmp_cientifico_leader: "Cientifico Lider",
    cmp_estado: "Estado",
    cmp_fecha_creacion: "Fecha de Creación",
    cmp_fecha_inicio: "Fecha de Inicio",
    cmp_integrantes: "Integrantes",
    acc_guardar: "Guardar",
    acc_cancelar: "Cancelar"
}

@Injectable()
export class LabelsService {
    getLabels() {
        return LABELS;
    }
}
