import {Component, OnInit} from "@angular/core";
import {LabelsService} from "../../labels.service";
import {NotificationsService} from "angular2-notifications/dist";
import {ActivatedRoute, Router} from "@angular/router";
import {Protocolo} from "../service/protocolo";
import {ProtocoloService} from "../service/protocolo.service";

@Component({
    templateUrl: "./protocolo-compara-version.component.html",
    providers: [ProtocoloService, LabelsService]
})
export class ProtocoloComparaVersionComponent implements OnInit {
    protocolo: Protocolo;
    idProtocolo: string;
    _: {};

    constructor(route: ActivatedRoute, _labelsService: LabelsService,
                private _protocoloService: ProtocoloService, private _notif: NotificationsService) {
        this._ = _labelsService.getLabels();
        this.idProtocolo = route.snapshot.params["id"];
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
