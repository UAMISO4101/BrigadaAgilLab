import {Component, OnInit} from "@angular/core";
import {HerramientaService} from "../service/herramienta.service";
import {LabelsService} from "../../labels.service";
import {NgForm} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";

@Component({
    templateUrl: "herramienta-nueva.component.html",
    providers: [HerramientaService, LabelsService]
})
export class HerramientaNuevaComponent implements OnInit {
    _: {};

    constructor(private _labelsService: LabelsService, private _herramientaService: HerramientaService,
                private router: Router, private _notif: NotificationsService) {
        this._ = _labelsService.getLabels();
    }

    ngOnInit() {
    }

    guardar(form: NgForm): void {
        console.log(form.value["nombre"]);
        this._herramientaService.nuevo(form.value).subscribe(res => this.okNuevo(), error => this.errorNuevo(error));

    }

    okNuevo(): void {
        this._notif.success("Ok", "Herramienta Creada");
        this.router.navigate(["/herramienta"]);

    }

    errorNuevo(error): void {
        console.log(error);
        this._notif.error("Error en la Creación", error._body);
    }
}
