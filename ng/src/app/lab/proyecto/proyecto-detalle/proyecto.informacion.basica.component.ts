import {Component, Input, OnInit} from "@angular/core";
import {Proyecto} from "../service/proyecto";
import {LabelsService} from "../../labels.service";


@Component({
    selector: "proyecto-informacion-basica",
    templateUrl: 'proyecto.informacion.basica.component.html',
    providers: [LabelsService]
})
export class ProyectoInformacionBasicaComponent implements OnInit {
    @Input() proyecto: Proyecto;
    _: {};

    constructor(private _labelsService: LabelsService) {
        console.log(_labelsService.getLabels())
        this._ = _labelsService.getLabels();
    }

    ngOnInit(): void {
        this.proyecto.descripcion = atob(this.proyecto.descripcion);
    }
}
