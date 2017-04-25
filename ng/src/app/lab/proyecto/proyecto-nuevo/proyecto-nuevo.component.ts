import {Component, OnInit} from "@angular/core";
import {ProyectoService} from "../service/proyecto.service";
import {LabelsService} from "../../labels.service";
import {NgForm} from '@angular/forms';


@Component({
    templateUrl: 'proyecto-nuevo.component.html',
    providers: [ProyectoService, LabelsService]
})
export class ProyectoNuevoComponent implements OnInit {
    _: {};

    constructor(private _labelsService: LabelsService, private _proyectoService: ProyectoService) {
        this._ = _labelsService.getLabels();
    }

    ngOnInit() {
    }

    guardar(form: NgForm): void {
        form.value["fecha_creacion"] = new Date();
        form.value["estado"] = "Nuevo";
        form.value["fecha_inicio"] = "";
        form.value["descripcion"] = btoa(form.value["descripcion"].trim());
        this._proyectoService.nuevoProyecto(form.value).subscribe(res => console.log(res), error => console.log(error));
    }
}
