import {Component, OnInit} from "@angular/core";
import {LabelsService} from "../../labels.service";

@Component({
    selector: "herramienta-controlador",
    templateUrl: "./herramienta-controlador.component.html",
})
export class HerramientaControladorComponent implements OnInit {

    _: {};

    constructor(private _labelsService: LabelsService) {
        this._ = _labelsService.getLabels();
    }

    ngOnInit() {
    }

}
