import {Component, Input, OnInit} from "@angular/core";
import {ExperimentoService} from "../service/experimento.service";
import {Experimento} from "../service/experimento";
import {LabelsService} from "../../labels.service";

@Component({
    selector: "experimento-list",
    templateUrl: "experimento.list.component.html",
    providers: [ExperimentoService]
})
export class ExperimentoListComponent implements OnInit {

    public experimentos: Experimento[] = [];
    @Input() filtro = "";
    _: {};

    constructor(private _experimentoService: ExperimentoService, private _labelsService: LabelsService) {
        this._ = _labelsService.getLabels();
    }

    filtrar() {
        console.log("Controlador filtrando proyectos");
        this._experimentoService.listarExperimentosFiltrados(this.filtro)
            .subscribe((experimentos: Experimento[]) => this.experimentos = experimentos);
    }

    getExperimentos() {
        this._experimentoService.getExperimentos().subscribe((experimentos: Experimento[]) => this.experimentos = experimentos);
    }

    ngOnInit(): any {
        this.getExperimentos();
    }
}
