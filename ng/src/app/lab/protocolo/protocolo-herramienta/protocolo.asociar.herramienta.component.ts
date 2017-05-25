
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
    selector: "protocolo-asociar-herramienta",
    moduleId: module.id,
    templateUrl: "protocolo.asociar.herramienta.component.html",
    providers: [ProtocoloService, LabelsService]
})
export class ProtocoloAsociarHerramientaComponent implements OnInit{

    public herramienta:Herramienta[];
    public id_protocolo:number;
    public id_herramienta:number;

    constructor(private _protocoloService: ProtocoloService,
                route: ActivatedRoute) {
        this.id_protocolo=route.snapshot.params["id_protocolo"];
       this.id_herramienta=route.snapshot.params["id_herramienta"];
    }

    clearVars(){
        this.id_protocolo=0;
        this.id_herramienta=0;
        window.history.back();
    }
      asociarHerramienta() {
          if(this.id_protocolo>0 && this.id_herramienta>0) {
              this._protocoloService.asociarHerramientaProtocolo(this.id_protocolo, this.id_herramienta)
                  .subscribe((herramienta:Herramienta[])=>this.herramienta=herramienta,err=>console.log(err),
                      ()=>this.clearVars());
          }

    }

ngOnInit(): void {
        this.asociarHerramienta();
    }

}
