import {Component, OnInit} from "@angular/core";
import {ExperimentoService} from "../service/experimento.service";
import {LabelsService} from "../../labels.service";
import {NgForm} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";

@Component({
    templateUrl: "experimento-nuevo.component.html",
    providers: [ExperimentoService, LabelsService]
})
export class ExperimentoNuevoComponent implements OnInit {
    _: {};

    constructor(private _labelsService: LabelsService, private _experimentoService: ExperimentoService,
                private router: Router, private _notif: NotificationsService) {
        this._ = _labelsService.getLabels();
    }

    ngOnInit() {
    }

    guardar(form: NgForm): void {
        console.log(form.value["nombre"]);
        this._experimentoService.nuevo(form.value).subscribe(res => this.okNuevo(), error => this.errorNuevo(error));

    }

    okNuevo(): void {
        this._notif.success("Ok", "Experimento Creado");
        this.router.navigate(["/experimento"]);

    }

    errorNuevo(error): void {
        console.log(error);
        this._notif.error("Error en la Creación", error._body);
    }
}