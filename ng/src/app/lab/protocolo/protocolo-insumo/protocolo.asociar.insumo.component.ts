import {Component, OnInit} from "@angular/core";
import {ProtocoloService} from "../../protocolo/service/protocolo.service";
import {Protocolo} from "../../protocolo/service/protocolo";
import {ActivatedRoute} from "@angular/router";
import {InsumosService} from "../../insumos/insumos.service";
import {Insumo} from "../../insumos/insumo";
import {LabelsService} from "../../labels.service";

//noinspection TsLint
@Component({
    selector: "protocolo-asociar-insumo",
    moduleId: module.id,
    templateUrl: "protocolo.asociar.insumo.component.html",
    providers: [ProtocoloService, LabelsService]
})
export class ProtocoloAsociarInsumoComponent implements OnInit{

    public insumo:Insumo[];
    public id_protocolo:number;
    public id_insumo:number;

    constructor(private _protocoloService: ProtocoloService,
                route: ActivatedRoute) {
        this.id_protocolo=route.snapshot.params["id_protocolo"];
       this.id_insumo=route.snapshot.params["id_insumo"];
    }

    clearVars(){
        this.id_protocolo=0;
        this.id_insumo=0;
        window.history.back();
    }
      asociarInsumo() {
          if(this.id_protocolo>0 && this.id_insumo>0) {
              this._protocoloService.asociarInsumoProtocolo(this.id_protocolo, this.id_insumo)
                  .subscribe((insumo:Insumo[])=>this.insumo=insumo,err=>console.log(err),
                      ()=>this.clearVars());
          }

    }

ngOnInit(): void {
        this.asociarInsumo();
    }

}
