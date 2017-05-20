import {Component, Input, OnInit} from "@angular/core";
import {Etapa, Protocolo} from "../service/protocolo";
import {LabelsService} from "../../labels.service";

@Component({
    selector: "protocolo-editor-proceso",
    templateUrl: "./protocolo-editor-proceso.component.html",
    styleUrls: ["./protocolo-editor-proceso.component.css"],
    providers: [LabelsService]
})
export class ProtocoloEditorProcesoComponent implements OnInit {

    @Input() proceso: Array<Etapa>;
    @Input() editor: boolean;

    textoProceso: string;
    pasosProceso: Array<Etapa> = [];

    _: {};

    constructor(private _labelsService: LabelsService) {
        this._ = _labelsService.getLabels();
        this.editor = true;
    }

    ngOnInit() {
        this.textoProceso = this.aTextoProceso(this.proceso);
        this.pasosProceso = this.proceso.slice();
    }

    aPasosProceso(textoEtapa: string) {
        const pasos = textoEtapa.split(/^\s*-\s/gm);
        this.pasosProceso.push({
            nombre: pasos[0],
            pasos: pasos.slice(1)
        });
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

    updatePasos() {
        this.pasosProceso.length = 0;
        this.textoProceso.split(/^\s*[\r\n]/gm).forEach(etapa => this.aPasosProceso(etapa));
        console.log("actualizando pasos");
    }

    updateTexto() {
        console.log("Drag realizado");
        const nuevoTexto = this.aTextoProceso(this.pasosProceso);
        if (nuevoTexto !== this.textoProceso) {
            this.textoProceso = nuevoTexto;
            console.log("actualizando texto");
        }

    }
}
