import {Component, OnInit} from "@angular/core";
import {ProtocoloService} from "../service/protocolo.service";
import {ActivatedRoute} from "@angular/router";
import {LabelsService} from "../../labels.service";
import {Protocolo} from "../service/protocolo";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
    templateUrl: "protocolo-detalle.component.html",
    providers: [ProtocoloService, LabelsService]
})
export class ProtocoloDetalleComponent implements OnInit {
    idProtocolo: string;
    protocolo: Protocolo;

    _: {};
    constructor(route: ActivatedRoute, private _protocoloService: ProtocoloService,
                private _labelsService: LabelsService, private _notif: NotificationsService) {
        this.idProtocolo = route.snapshot.params["id"];
        this._ = _labelsService.getLabels();
    }

    ngOnInit() {
        this.getProtocolo();
    }

    private getProtocolo() {
        this._protocoloService
            .getProtocolo(this.idProtocolo)
            .subscribe(
                product => this.protocolo = product,
                error => this._notif.error("Error de Comunicación", error._body));
    }
}
