import {Component} from "@angular/core";
import {ExperimentoService} from "../service/experimento.service";
import {Experimento} from "../service/experimento";
import {OnInit} from "@angular/core";

@Component({
    selector: "experimento-list",
    templateUrl: 'experimento.list.component.html',
    providers: [ExperimentoService]
})
export class ExperimentoListComponent implements OnInit {
    public experimentos: Experimento[] = [];

    constructor(private _experimentoService: ExperimentoService) {
    }

    getExperimentos() {
        this._experimentoService.getExperimentos().subscribe((experimentos: Experimento[]) => this.experimentos = experimentos);
    }

    ngOnInit(): any {
        this.getExperimentos();
    }
}
