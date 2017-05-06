import {Component, Input, OnInit} from '@angular/core';
import {HerramientaService} from '../service/herramienta.service';
import {LabelsService} from '../../labels.service';
import {Herramienta} from "../service/herramienta";

@Component({
    moduleId: module.id,
    templateUrl: 'herramienta.component.html',
    providers: [HerramientaService]
})
export class HerramientaComponent implements OnInit {
    public herramientas: Herramienta[] = [];
    @Input() nombre = '';
    _: {};

    constructor(private _herramientaService: HerramientaService,private _labelsService: LabelsService) {
        this._ = _labelsService.getLabels();
    }

    listarHerramientas() {
        console.log('Aqui se inicia la carga de herramientas');

        if (this.nombre !== '') {
            this._herramientaService.listarHerramientasFiltroNombre(this.nombre)
                .subscribe((herramientas: Herramienta[]) => this.herramientas = herramientas);
            console.log('get listarHerramientasFiltroNombre');
        } else {
            this._herramientaService.listarHerramientas()
                .subscribe((herramientas: Herramienta[]) => this.herramientas = herramientas);
            console.log('get listarHerramientas');
        }

    }

    keyup() {
        this.listarHerramientas();
    }

    ngOnInit() {
        this.listarHerramientas();
    }
}
