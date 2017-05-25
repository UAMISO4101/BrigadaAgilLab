import {Component, OnInit} from "@angular/core";
import {ProyectoService} from "../service/proyecto.service";
import {Proyecto} from "../service/proyecto";
import {Experimento} from "../../experimento/service/experimento";
import {ExperimentoService} from "../../experimento/service/experimento.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "proyecto-experimento",
    templateUrl: "proyecto.asociar.exp.component.html",
    providers: [ProyectoService, ExperimentoService]
})
export class ProyectoAsociarExpComponent implements OnInit {
    public experimentos: Experimento[] = [];
    public experimento: Experimento;
    public idProyecto: string;
    public proyecto: Proyecto[] = [];
    public show: string;


    constructor(private _experimentoService: ExperimentoService,
                private _proyectoService: ProyectoService,
                route: ActivatedRoute) {
        this.idProyecto = route.snapshot.params["id"];
    }

    getExperimentos() {
        this._experimentoService
            .getExperimentos()
            .subscribe((experimentos: Experimento[]) =>
                this.experimentos = experimentos);
    }

    onSelect(item: Experimento) {
        this.experimento = item;
        this.getProtocolos(item);
        this.show = "true";
    }

    asociar() {
        this._proyectoService.asociarExperimento(this.idProyecto, this.experimento.id)
            .subscribe(
                product => console.log(product),
                error => console.log(<any>error));
    }

    getProtocolos(item) {

        this._experimentoService.getProtocolos(item).subscribe(res => this.experimento["protocolos"] = res,
            error => console.log(error),
            () => console.log(this.experimento));
    }

    ngOnInit(): any {
        this.getExperimentos();
        window.scrollTo(0, 0);

    }
}
