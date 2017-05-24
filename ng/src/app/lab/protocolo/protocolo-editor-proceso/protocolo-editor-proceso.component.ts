import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Etapa, Protocolo} from "../service/protocolo";
import {LabelsService} from "../../labels.service";
import {Subject} from "rxjs/Subject";

@Component({
    selector: "protocolo-editor-proceso",
    templateUrl: "./protocolo-editor-proceso.component.html",
    styleUrls: ["./protocolo-editor-proceso.component.css"],
    providers: [LabelsService]
})
export class ProtocoloEditorProcesoComponent implements OnInit {

    @Input() proceso: Array<Etapa>;
    @Input() editable = false;
    editor: boolean;
    @Output() updated: EventEmitter<Array<Etapa>> = new EventEmitter();
    debouncer: Subject<Array<Etapa>> = new Subject<Array<Etapa>>();

    textoProceso: string;
    pasosProceso: Array<Etapa> = [];

    _: {};

    constructor(private _labelsService: LabelsService) {
        this._ = _labelsService.getLabels();
        this.editor = this.editable ? false : true;
        this.debouncer
            .debounceTime(500)
            .subscribe((val) => this.updated.emit(val));
    }

    ngOnInit() {
        this.textoProceso = this.aTextoProceso(this.proceso);
        this.pasosProceso = this.proceso.slice();
    }

    aPasosProceso(textoEtapa: string) {
        const pasos = textoEtapa.split(/^\s*-\s/gm);
        this.pasosProceso.push({
            nombre: pasos[0].replace(/[\r\n]*$/gm, ""),
            pasos: pasos.slice(1).map(paso => paso.replace(/[\r\n]*$/gm, ""))
        });
    }

    aTextoProceso(pasosProceso: Array<Etapa>): string {
        let buffer = "";
        const s = "\n- ";
        pasosProceso.forEach(function (etapa) {
            buffer += "\n\n" + etapa.nombre;
            buffer += etapa.pasos ? s + etapa.pasos.map(paso => paso.replace(/[\r\n]*$/gm, "")).join(s) : "";
        });
        return buffer.substring(2);
    }

    /**
     * Llamado cuando cambia el contenido del text area
     */
    updatePasos() {
        this.pasosProceso.length = 0;
        this.textoProceso.split(/^\s*[\r\n]/gm).forEach(etapa => this.aPasosProceso(etapa));
        this.debouncer.next(this.pasosProceso);
    }

    updateTexto() {
        const nuevoTexto = this.aTextoProceso(this.pasosProceso);
        if (nuevoTexto !== this.textoProceso) {
            this.textoProceso = nuevoTexto;
            this.debouncer.next(this.pasosProceso);
        }
    }

    toogleEditor() {
        this.editor = !this.editor;
    }
}
