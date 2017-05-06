import {Component, OnInit} from '@angular/core';
import {LabelsService} from "../../labels.service";

@Component({
    selector: 'proyecto-controlador',
    templateUrl: 'proyecto-controlador.component.html'
})
/**
 * Component principal de proyectos, permite el acceso a busquedas y creacion de entidades proyecto
 */
export class ProyectoControladorComponent implements OnInit {

    _: {};

    constructor(private _labelsService: LabelsService) {
        this._ = _labelsService.getLabels();
    }

    ngOnInit() {
    }

}
