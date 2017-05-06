import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProyectoService} from '../service/proyecto.service';
import {Proyecto} from '../service/proyecto';
import {ExperimentoService} from '../../experimento/service/experimento.service';
import {LabelsService} from '../../labels.service';
import {ExperimentoProyecto} from '../service/proyecto-experimento';
import {Protocolo} from '../../protocolo/service/protocolo';


@Component({
    templateUrl: 'proyecto.detalle.component.html',
    providers: [ProyectoService, LabelsService]
})
export class ProyectoDetalleComponent implements OnInit {
    idProyecto: string;
    proyecto: Proyecto;
    experimentos: ExperimentoProyecto[];
    documentos: any[];
    experimentoSeleccionado: ExperimentoProyecto;
    protocolos: Protocolo[];
    protocoloSeleccionado: Protocolo;

    _: {};

    constructor(route: ActivatedRoute, private _proyectoService: ProyectoService, private _experimentoService: ExperimentoService,
                private _labelsService: LabelsService) {
        this.idProyecto = route.snapshot.params['id'];
        this._ = _labelsService.getLabels();
    }

    private getProyecto() {
        this._proyectoService
            .getProyecto(this.idProyecto)
            .subscribe(
                product => this.proyecto = product,
                error => console.log(<any>error));
    }

    ngOnInit(): any {
        this.getProyecto();
        this.getExperimentosProyecto();
    }

    private getExperimentosProyecto() {
        this._proyectoService
            .getExperimentosProyecto(this.idProyecto)
            .subscribe(
                product => this.experimentos = product,
                error => console.log(<any>error));
    }

    private hayExperimentos(): boolean {
        return this.experimentos && this.experimentos.length > 0;
    }

    private hayDocumentos(): boolean {
        return true;
    }

    private seleccionarExperimento(seleccion: ExperimentoProyecto) {
        this.experimentoSeleccionado = seleccion;

    }

}
