import {Component} from "@angular/core";
import {ProyectoService} from "../service/proyecto.service";
import {Proyecto} from "../service/proyecto";
import {OnInit} from "@angular/core";
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { CompleterService, CompleterData } from 'ng2-completer';
import {environment} from "../../../../environments/environment";
declare var jQuery:any;



@Component({
    selector: "proyecto-grafica",
    moduleId: module.id,
    templateUrl: 'proyecto.grafica.component.html',

})
export class ProyectoGraficaComponent   implements OnInit {
    public pieChartLabels:string[] = ['Terminado', 'En curso', 'Sin Iniciar'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';
    optionsModel: number[];
    public myOptions: IMultiSelectOption[] = [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
    ];
    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default btn-block',
        dynamicTitleMaxItems: 1,
        displayAllSelectedText: true
    };

    public dataService: CompleterData;
    public searchStr: string;

    public captain: string;


    constructor(private _proyectoService: ProyectoService, private completerService: CompleterService) {
        this.dataService = completerService.remote(environment.url_servicios+'proyecto/autocomplete/',"nombre","nombre");
    }

    ngOnInit(): any {
        //this.getProyectos();
        jQuery('#complete').find('input').addClass('form-control');

    }

    public chartClicked(e:any):void {
    console.log(e);
    console.info(this.dataService);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    onChange() {
        console.log(this.optionsModel);
    }

    public selectedItem(e:any):void {
        this.pieChartData = [Math.floor(Math.random() * 200) + 1,Math.floor(Math.random() * 300) + 1,Math.floor(Math.random() * 500) + 1];
        console.log(this.pieChartData);
    }

}
