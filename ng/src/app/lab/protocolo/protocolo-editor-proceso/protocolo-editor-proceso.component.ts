import {Component, Input, OnInit} from "@angular/core";
import {Protocolo} from "../service/protocolo";

@Component({
    selector: "protocolo-editor-proceso",
    templateUrl: "./protocolo-editor-proceso.component.html",
    styleUrls: ["./protocolo-editor-proceso.component.css"]
})
export class ProtocoloEditorProcesoComponent implements OnInit {

    @Input() protocolo: Protocolo;

    constructor() {
    }

    ngOnInit() {
    }

}
