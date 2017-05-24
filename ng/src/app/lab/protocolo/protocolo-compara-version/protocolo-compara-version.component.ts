import {Component, ElementRef, OnInit} from "@angular/core";
import {LabelsService} from "../../labels.service";
import {NotificationsService} from "angular2-notifications/dist";
import {ActivatedRoute, Router} from "@angular/router";
import {Etapa, Protocolo} from "../service/protocolo";
import {ProtocoloService} from "../service/protocolo.service";
import Utils from "../../Utils";

declare var jQuery: any;

@Component({
    templateUrl: "./protocolo-compara-version.component.html",
    providers: [ProtocoloService, LabelsService]
})
export class ProtocoloComparaVersionComponent implements OnInit {

    protocolo: Protocolo;

    idProtocolo: string;
    versionLeft: string;
    versionRight: string;

    protocoloLeft: Protocolo;
    protocoloRight: Protocolo;

    initVersiones = false;
    _: {};

    verDiffs = {
        info_basica: false,
        proceso: false
    };


    constructor(private _el: ElementRef, route: ActivatedRoute, _labelsService: LabelsService,
                private _protocoloService: ProtocoloService, private _notif: NotificationsService) {
        this._ = _labelsService.getLabels();
        this.idProtocolo = route.snapshot.params["id"];
        this.versionLeft = route.snapshot.params["left"];
        this.versionRight = route.snapshot.params["right"];
    }

    ngOnInit() {
        this._protocoloService
            .getProtocolo(this.idProtocolo)
            .subscribe(
                product => this.protocolo = product,
                error => this._notif.error("Error de Comunicación", error._body));

        if (this.versionLeft && this.versionRight) {
            this._protocoloService
                .versiones(this.idProtocolo, this.versionLeft, this.versionRight)
                .subscribe(
                    product => this.cargarVersiones(product),
                    error => this._notif.error("Error de Comunicación", error._body));
        } else {
            this._protocoloService
                .ultimasVersiones(this.idProtocolo)
                .subscribe(
                    product => this.cargarVersiones(product),
                    error => this._notif.error("Error de Comunicación", error._body));
        }

    }

    private cargarVersiones(versiones: Protocolo[]) {
        if (versiones[0].id) {
            this.protocoloLeft = versiones[0];
            this.protocoloLeft.proceso = Utils.json2Obj(Utils.deserializar("" + versiones[0].proceso));
            this.protocoloLeft["textoProceso"] = this.aTextoProceso(this.protocoloLeft.proceso);
        } else {
            this.protocoloLeft = undefined;
        }

        if (versiones[1].id) {
            this.protocoloRight = versiones[1];
            this.protocoloRight.proceso = Utils.json2Obj(Utils.deserializar("" + versiones[1].proceso));
            this.protocoloRight["textoProceso"] = this.aTextoProceso(this.protocoloRight.proceso);
        } else {
            this.protocoloRight = undefined;
        }
        this.initVersiones = true;
    }

    aTextoProceso(pasosProceso: Array<Etapa>): string {
        let buffer = "";
        const s = "\n- ";
        pasosProceso.forEach(function (etapa) {
            buffer += "\n\n" + etapa.nombre;
            buffer += etapa.pasos ? s + etapa.pasos.join(s) : "";
        });
        return buffer.substring(2);
    }
}
