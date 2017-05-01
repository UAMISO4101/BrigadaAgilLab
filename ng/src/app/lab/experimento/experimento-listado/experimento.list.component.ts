import {Component, Input, OnInit} from '@angular/core';
import {ExperimentoService} from '../service/experimento.service';
import {Experimento} from '../service/experimento';

@Component({
    selector: 'experimento-list',
    templateUrl: 'experimento.list.component.html',
    providers: [ExperimentoService]
})
export class ExperimentoListComponent implements OnInit {

    public experimentos: Experimento[] = [];
    @Input() filtro = '';

    constructor(private _experimentoService: ExperimentoService) {
    }

    filtrar() {
        console.log('Controlador filtrando proyectos');
        this._experimentoService.listarExperimentosFiltrados(this.filtro).subscribe((experimentos: Experimento[]) => this.experimentos = experimentos);
    }

    getExperimentos() {
        this._experimentoService.getExperimentos().subscribe((experimentos: Experimento[]) => this.experimentos = experimentos);
    }

    ngOnInit(): any {
        this.getExperimentos();
    }
}
