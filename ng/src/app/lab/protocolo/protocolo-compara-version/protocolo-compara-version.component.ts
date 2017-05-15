import {Component, OnInit} from "@angular/core";
import {LabelsService} from "../../labels.service";
import {NotificationsService} from "angular2-notifications/dist";
import {Router} from "@angular/router";
import {Protocolo} from "../service/protocolo";

@Component({
    selector: "protocolo-compara-version",
    templateUrl: "./protocolo-compara-version.component.html"

})
export class ProtocoloComparaVersionComponent implements OnInit {
    protocolo: Protocolo;

    _: {};
    constructor(private _labelsService: LabelsService,
                private router: Router, private _notif: NotificationsService) {
        this._ = _labelsService.getLabels();
    }

    ngOnInit() {
    }

}
