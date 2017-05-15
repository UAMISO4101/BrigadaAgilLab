import {Component, OnInit} from "@angular/core";
import {LabelsService} from "../../labels.service";

@Component({
    selector: "protocolo-controlador",
    templateUrl: "./protocolo-controlador.component.html"
})
/**
 * Component principal de protocolos, permite el acceso a busquedas y creacion de entidades protocolo
 */
export class ProtocoloControladorComponent implements OnInit {

    _: {};

    constructor(private _labelsService: LabelsService) {
        this._ = _labelsService.getLabels();
    }

    ngOnInit() {
    }

}
