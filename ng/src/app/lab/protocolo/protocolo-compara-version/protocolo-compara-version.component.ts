import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {LabelsService} from "../../labels.service";
import {NotificationsService} from "angular2-notifications/dist";
import {ActivatedRoute, Router} from "@angular/router";
import {Protocolo} from "../service/protocolo";
import {ProtocoloService} from "../service/protocolo.service";

declare var jQuery: any;

@Component({
    templateUrl: "./protocolo-compara-version.component.html",
    providers: [ProtocoloService, LabelsService]
})
export class ProtocoloComparaVersionComponent implements OnInit, AfterViewInit {

    protocolo: Protocolo;
    idProtocolo: string;
    _: {};

    verDiffs = {
        info_basica: false,
        proceso: false
    };

    constructor(private _el: ElementRef, route: ActivatedRoute, _labelsService: LabelsService,
                private _protocoloService: ProtocoloService, private _notif: NotificationsService) {
        this._ = _labelsService.getLabels();
        this.idProtocolo = route.snapshot.params["id"];
    }

    ngOnInit() {
        this.getProtocolo();
    }

    ngAfterViewInit(): void {
        this.initComparacion();
    }

    left = "Lorem Ipsum is simply dummy text of the printing and typesetting\
 industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\
 when an unknown printer took a galley of type and scrambled it to make a type specimen\
 book. It has survived not only centuries, but also the leap into electronic typesetting.";

    right = "Lorem Ipsum is simply typesetting dummy text of the printing and has\
 been the \nindustry's typesetting. Lorem Ipsum has been the industry's standard dummy text\
 ever the 1500s, when an printer took a galley of type and simply it to make a type. It\
 has survived not only five centuries, but survived not also the leap into electronic\
 typesetting.";

    private getProtocolo() {
        this._protocoloService
            .getProtocolo(this.idProtocolo)
            .subscribe(
                product => this.protocolo = product,
                error => this._notif.error("Error de Comunicación", error._body));
    }

    private initComparacion() {
        jQuery(document).ready(function () {

        });
    }
}
