import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProyectoService} from "../service/proyecto.service";
import {Proyecto} from "../service/proyecto";
import {ExperimentoService} from "../../experimento/experimento.service";
import {LabelsService} from "../../labels.service";


@Component({
    templateUrl: 'proyecto.detalle.component.html',
    providers: [ProyectoService]
})
export class ProyectoDetalleComponent implements OnInit {
    public idProyecto: string;
    public proyecto: Proyecto[] = [];
    public show: string;

    _: {};

    constructor(route: ActivatedRoute, private _proyectoService: ProyectoService, private _experimentoService: ExperimentoService,
                private _labelsService: LabelsService) {
        this.idProyecto = route.snapshot.params['id'];
        this._ = _labelsService.getLabels();

    }

    getProyecto() {
        this._proyectoService
            .getProyectos()
            .subscribe((proyectos: Proyecto[]) =>
                    this.proyecto = JSON.parse(JSON.stringify(proyectos.filter(p => p.id == parseInt(this.idProyecto))
                        .pop())),
                error => console.log(error),
                () => this.show = "true");
    }


    ngOnInit(): any {
        this.getProyecto();

    }
}
