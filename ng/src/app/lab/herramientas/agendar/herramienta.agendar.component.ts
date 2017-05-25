import {Component, Input, OnInit} from "@angular/core";
import {HerramientaService} from "../service/herramienta.service";
import {LabelsService} from "../../labels.service";
import {Herramienta} from "../service/herramienta";
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: "herramienta.agendar.component.html",
    providers: [HerramientaService]
})
export class HerramientaAgendarComponent implements OnInit {
    public herramientas: Herramienta[] = [];
    @Input() nombre = "";
    _: {};
    public id_protocolo:number;

    constructor(private _herramientaService: HerramientaService, private _labelsService: LabelsService,
                route: ActivatedRoute) {
        this.id_protocolo = route.snapshot.params["id_protocolo"];
        this._ = _labelsService.getLabels();
    }



    listarHerramientas() {
        console.log("Aqui se inicia la carga de herramientas");

        if (this.nombre !== "") {
            this._herramientaService.listarHerramientasFiltroNombre(this.nombre)
                .subscribe((herramientas: Herramienta[]) => this.herramientas = herramientas);
            console.log("get listarHerramientasFiltroNombre");
        } else {
            this._herramientaService.listarHerramientas()
                .subscribe((herramientas: Herramienta[]) => this.herramientas = herramientas);
            console.log("get listarHerramientas");
        }

    }

    keyup() {
        this.listarHerramientas();
    }

    ngOnInit() {
        this.listarHerramientas();
    }
}
