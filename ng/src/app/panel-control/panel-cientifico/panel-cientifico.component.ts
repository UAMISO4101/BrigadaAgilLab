import {Component, OnInit} from "@angular/core";
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "lab-panel-cientifico",
    templateUrl: "panel-cientifico.component.html"
})
export class PanelCientificoComponent implements OnInit {


    items: Observable<Array<any>>;

    proyectosOriginales = [];

    proyectosFiltrados = [];

    lineChartLabels: any = {
        semana: [],
        mes: [],
        trimestre: []
    };

    lineChartOptions: any = {
        responsive: true,
        legend: {
            position: "right"
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "% completado"
                },
                ticks: {
                    suggestedMin: 0,   // minimum will be 0, unless there is a lower value.
                    max: 100,
                    stepSize: 20,
                }
            }],
            xAxes: [{
                ticks: {
                    maxTicksLimit: 20
                }
            }]
        }
    };

    lineChartType = "line";

    /**
     * Define el valor inicial del rango a desplegar
     * @type {number}
     */
    tipoRango = "semana";

    constructor(private datePipe: DatePipe) {
        const cur = new Date();
        const pattern = "dd-MMM";
        for (let day = 0; day < 90; day++) {
            const date = new Date();
            date.setDate(cur.getDate() - day);
            this.lineChartLabels.trimestre.push(this.datePipe.transform(date, pattern));
            if (day < 30) {
                this.lineChartLabels.mes.push(this.datePipe.transform(date, pattern));
                if (day < 8) {
                    this.lineChartLabels.semana.push(this.datePipe.transform(date, pattern));
                }
            }
        }

        this.lineChartLabels.semana.reverse();
        this.lineChartLabels.mes.reverse();
        this.lineChartLabels.trimestre.reverse();
        this.proyectosFiltrados = [];
        this.proyectosOriginales = [];
        this.items = Observable.of(this.proyectosOriginales);
    }

    ngOnInit(): void {
        this.listProyectos();
        this.onFiltrado(this.proyectosOriginales);
    }

    rango(tipoRango: string): void {
        this.tipoRango = tipoRango;
    }

    dias(): Array<any> {
        return this.lineChartLabels[this.tipoRango];
    }

    hayProyectos() {
        return this.proyectosFiltrados.length > 0;
    }

    onFiltrado(filtrado: Array<any>) {
        this.proyectosFiltrados.length = 0;
        this.proyectosFiltrados = filtrado.slice();
    }

    listProyectos() {
        this.proyectosOriginales.length = 0;
        const temp = [];
        temp.length = 8;

        temp.fill(this.randomIntFromInterval(1, 100));
        this.proyectosOriginales.push({data: temp.slice(), label: "Proyecto " + temp[0]});
        temp.fill(this.randomIntFromInterval(1, 100));
        this.proyectosOriginales.push({data: temp.slice(), label: "Proyecto " + temp[0]});
        temp.fill(this.randomIntFromInterval(1, 100));
        this.proyectosOriginales.push({data: temp.slice(), label: "Proyecto " + temp[0]});
    }

    randomIntFromInterval(min, max): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
