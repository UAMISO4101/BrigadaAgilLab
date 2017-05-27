import {Component, OnInit} from "@angular/core";
import {ProtocoloService} from "../service/protocolo.service";
import {ActivatedRoute} from "@angular/router";
import {LabelsService} from "../../labels.service";
import {Etapa, Protocolo} from "../service/protocolo";
import {NotificationsService} from "angular2-notifications/dist";
import Utils from "../../Utils";

declare var jQuery: any;

@Component({
    templateUrl: "protocolo-detalle.component.html",
    providers: [ProtocoloService, LabelsService]
})
export class ProtocoloDetalleComponent implements OnInit {
    idProtocolo: string;
    protocolo: Protocolo;
    editor = false;
    procesoInicial: string;
    _: {};

    pasosProceso: Array<Etapa> = [];

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
                product => this.initProtocolo(product),
                error => this._notif.error("Error de Comunicación", error._body));
    }

    private initProtocolo(protocolo: Protocolo) {
        this.procesoInicial = "" + protocolo.proceso;
        protocolo.proceso = Utils.json2Obj(Utils.deserializar("" + protocolo.proceso));
        this.protocolo = protocolo;
    }

    syncProceso(event) {
        this.pasosProceso = event;
    }

    toogleEditor() {
        this.editor = !this.editor;
        jQuery(".editar-proceso-protocolo").click();
    }

    editorExterno(editorProceso: boolean) {
        this.editor = editorProceso;
    }

    guardar() {
        this.protocolo.proceso = this.pasosProceso;

        this._protocoloService
            .actualizar(this.protocolo)
            .subscribe(
                val => this.ok(),
                error => this._notif.error("Error de Comunicación", error._body));
    }

    ok() {
        this._notif.success("OK", "Protocolo Actualizado Correctamente");
        this.getProtocolo();
    }
}
