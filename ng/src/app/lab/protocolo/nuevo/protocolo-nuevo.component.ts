import {Component, OnInit} from "@angular/core";
import {ProtocoloService} from "../service/protocolo.service";
import {LabelsService} from "../../labels.service";
import {NgForm} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";
import {Etapa, Protocolo} from "../service/protocolo";
import Utils from "../../Utils";

@Component({
    templateUrl: "protocolo-nuevo.component.html",
    providers: [ProtocoloService, LabelsService]
})
export class ProtocoloNuevoComponent implements OnInit {
    _: {};

    pasosProceso: Array<Etapa> = [];

    constructor(private _labelsService: LabelsService, private _protocoloService: ProtocoloService,
                private router: Router, private _notif: NotificationsService) {
        this._ = _labelsService.getLabels();
    }

    ngOnInit() {
    }

    guardar(form: NgForm): void {
        let ref: Protocolo;
        console.log(form.value["nombre"]);
        form.value["fecha_creacion"] = new Date();
        form.value["version"] = "1";
        form.value["proceso"] = Utils.serializar(Utils.obj2String(this.pasosProceso));
        this._protocoloService.nuevo(form.value).subscribe(res => this.okNuevo(), error => this.errorNuevo(error));

    }

    okNuevo(): void {
        this._notif.success("Ok", "Protocolo Creado");
        this.router.navigate(["/protocolo"]);

    }

    errorNuevo(error): void {
        console.log(error);
        this._notif.error("Error en la Creación", error._body);
    }

    syncProceso(event) {
        this.pasosProceso = event;
    }
}
