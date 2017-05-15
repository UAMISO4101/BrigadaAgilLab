import {Injectable} from "@angular/core";

export const LABELS = {
    tit_inicio: "Inicio",
    tit_acciones: "Acciones",
    tit_insumos: "Insumos",
    tit_insumo: "Insumo",
    tit_proyecto: "Proyecto",
    tit_proyectos: "Proyectos",
    tit_experimento: "Experimento",
    tit_experimentos: "Experimentos",
    tit_herramientas: "Herramientas",
    tit_res_experimento: "Resumen Experimento",
    tit_protocolo: "Protocolo",
    tit_protocolos: "Protocolos",
    tit_nueva_herramienta: "Nueva Herramienta",
    tit_nuevo_proyecto: "Nuevo Proyecto",
    tit_nuevo_protocolo: "Nuevo Protocolo",
    tit_nuevo_insumo: "Nuevo Insumo",
    tit_nuevo_experimento: "Nuevo Experimento",
    tit_todos_proyectos: "Todos los Proyectos",
    tit_todos_protocolos: "Todos los Protocolos",
    tit_info_basica: "Información Básica",
    tit_docs_adjuntos: "Documentos Adjuntos",

    cmp_nombre: "Nombre",
    cmp_objetivo: "Objetivo",
    cmp_identificador: "Identificador",
    cmp_descripcion: "Descripción",
    cmp_cientifico_leader: "Científico Líder",
    cmp_estado: "Estado",
    cmp_fecha: "Fecha",
    cmp_fecha_creacion: "Fecha de Creación",
    cmp_fecha_inicio: "Fecha de Inicio",
    cmp_description: "Descripción",
    cmp_integrantes: "Integrantes",
    cmp_precio: "Precio",
    cmp_unidad: "Unidad",
    cmp_version: "Versión",
    cmp_experimento: "Experimento",
    acc_guardar: "Guardar",
    acc_cancelar: "Cancelar",


    msg_no_exp_proyecto: "No existen experimentos asociados al proyecto.",
    msg_no_docs_proyecto: "No existen documentos asociados al proyecto.",
    msg_click_agregar: "Click acá para agregar."
};

@Injectable()
export class LabelsService {
    getLabels() {
        return LABELS;
    }
}
