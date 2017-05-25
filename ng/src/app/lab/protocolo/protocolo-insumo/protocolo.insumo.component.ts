import {Component, OnInit} from "@angular/core";
import {ProtocoloService} from "../../protocolo/service/protocolo.service";
import {Protocolo} from "../../protocolo/service/protocolo";
import {ActivatedRoute} from "@angular/router";
import {InsumosService} from "../../insumos/insumos.service";
import {Insumo} from "../../insumos/insumo";
import {LabelsService} from "../../labels.service";

//noinspection TsLint
@Component({
    selector: "protocolo-insumo",
    moduleId: module.id,
    templateUrl: "protocolo.insumo.component.html",
    providers: [ProtocoloService, LabelsService]
})
export class ProtocoloInsumoComponent implements OnInit {

    public id:number;
    public insumos:Insumo[];


    constructor(private _protocoloService: ProtocoloService,
                route: ActivatedRoute) {
        this.id = route.snapshot.params["id"];

    }

      getProtocoloInsumos() {
        this._protocoloService.listarProtocoloInsumos(this.id).subscribe((insumos:Insumo[])=>this.insumos=insumos);

    }


    ngOnInit() {
        this.getProtocoloInsumos();
    }
}
