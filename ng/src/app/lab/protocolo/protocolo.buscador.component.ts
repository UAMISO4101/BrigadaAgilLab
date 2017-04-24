import {Component, OnChanges, SimpleChanges, Input} from "@angular/core";
import {ProtocoloService} from "./service/protocolo.service";
import {Protocolo} from "./service/protocolo";
import {OnInit} from "@angular/core";

@Component({
    selector: 'protocolo-buscador',
    moduleId: module.id,
    templateUrl: 'protocolo.buscador.component.html'
})
export class ProtocoloBuscadorComponent {

    public protocolos:Protocolo[] = [];

    @Input() nombre:string = "";
    @Input() fuente:string;

    constructor(private _protocoloService:ProtocoloService) {
    }

    listarProtocolos() {
        console.log("Aqui se inicia la carga de protocolos")
        if (this.fuente != null) {
            this._protocoloService.listarProtocolosFiltradosEnExperimentoPorNombre(this.fuente, this.nombre).subscribe((protocolos:Protocolo[]) => this.protocolos = protocolos);
            console.log("get listarProtocolosFiltradosEnExperimentoPorNombre")
        } else {
            if (this.nombre != "") {
                this._protocoloService.listarProtocolosFiltradosNombre(this.nombre).subscribe((protocolos:Protocolo[]) => this.protocolos = protocolos);
                console.log("get listarProtocolosFiltradosNombre")
            } else {
                this._protocoloService.listarProtocolos().subscribe((protocolos:Protocolo[]) => this.protocolos = protocolos);
                console.log("get listarProtocolos")
            }
        }
    }

    keyup() {
        this.listarProtocolos();
    }

    ngOnInit():any {
        this.listarProtocolos();
    }
}
