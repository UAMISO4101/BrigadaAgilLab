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
                product => this.initProtocolo(product),
                error => this._notif.error("Error de Comunicación", error._body));
    }

    private initProtocolo(protocolo: Protocolo) {
        this.protocolo = protocolo;
        this.protocolo["proceso"] = [{
            nombre: "Binding DNA",
            pasos: ["Transfer the 10-20 µl blood sample to a sterile microcentrifuge tube (or a 96 x 2 ml deep well plate).",
                "Add 120 µl of ChargeSwitch® Purification Mix to the digested sample (from Step 3, above) " +
                "and pipet up and down gently 5 times to mix."]
        }, {
            nombre: "Washing DNA",
            pasos: ["Remove the sample containing the pelleted magnetic beads from the MagnaRack™ (Step 11, above). " +
            "There should be no supernatant in the tube.",
                "Add 500 µl of ChargeSwitch® Wash Buffer (W12) to the sample and pipet up and down gently twice to " +
                "resuspend the magnetic beads."]
        }];
    }
}
