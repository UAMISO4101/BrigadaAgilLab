import {Component, OnInit} from "@angular/core";
import {ProyectoService} from "../service/proyecto.service";
import {LabelsService} from "../../labels.service";
import {NgForm} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";

@Component({
    templateUrl: "proyecto-nuevo.component.html",
    providers: [ProyectoService, LabelsService]
})
export class ProyectoNuevoComponent implements OnInit {
    _: {};

    constructor(private _labelsService: LabelsService, private _proyectoService: ProyectoService,
                private router: Router, private _notif: NotificationsService) {
        this._ = _labelsService.getLabels();
    }

    ngOnInit() {
    }

    guardar(form: NgForm): void {
        form.value["fecha_creacion"] = new Date();
        form.value["estado"] = "Nuevo";
        form.value["fecha_inicio"] = "";
        form.value["descripcion"] = btoa(form.value["descripcion"].trim());
        this._proyectoService.nuevoProyecto(form.value).subscribe(res => this.okNuevo(), error => this.errorNuevo(error));

    }

    okNuevo(): void {
        this._notif.success("Ok", "Proyecto Creado");
        this.router.navigate(["/proyecto"]);

    }

    errorNuevo(error): void {
        console.log(error);
        this._notif.error("Error en la Creación", error._body);
    }
}
