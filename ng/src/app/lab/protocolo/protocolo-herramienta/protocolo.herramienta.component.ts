import {Component, OnInit} from "@angular/core";
import {ProtocoloService} from "../../protocolo/service/protocolo.service";
import {Protocolo} from "../../protocolo/service/protocolo";
import {ActivatedRoute} from "@angular/router";
import {InsumosService} from "../../insumos/insumos.service";
import {Insumo} from "../../insumos/insumo";
import {LabelsService} from "../../labels.service";
import {Herramienta} from "../../herramientas/service/herramienta";

//noinspection TsLint
@Component({
    selector: "protocolo-herramienta",
    moduleId: module.id,
    templateUrl: "protocolo.herramienta.component.html",
    providers: [ProtocoloService, LabelsService]
})
export class ProtocoloHerramientaComponent implements OnInit {

    public id:number;
    public herramientas:Herramienta[];


    constructor(private _protocoloService: ProtocoloService,
                route: ActivatedRoute) {
        this.id = route.snapshot.params["id"];

    }

      getProtocoloHerramientas() {
        this._protocoloService.listarProtocoloHerramientas(this.id).subscribe((herramientas:Herramienta[])=>this.herramientas=herramientas);

    }


    ngOnInit() {
        this.getProtocoloHerramientas();
    }
}
