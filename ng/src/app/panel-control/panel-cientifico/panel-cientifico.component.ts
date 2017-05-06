import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'lab-panel-cientifico',
    templateUrl: 'panel-cientifico.component.html'
})
export class PanelCientificoComponent {

    lineChartData: Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40, 10], label: 'Series A'},
    ];

    lineChartLabels: any = {
        semana: [],
        mes: [],
        trimestre: []
    };

    lineChartXsteps: any = {
        semana: 1,
        mes: 2,
        trimestre: 10
    };

    lineChartOptions: any = {
        responsive: true,
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '% completado'
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


    lineChartType = 'line';

    /**
     * Define el valor inicial del rango a desplegar
     * @type {number}
     */
    tipoRango = 'semana';

    constructor(private datePipe: DatePipe) {
        const cur = new Date();
        const pattern = 'dd-MMM';
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
    }

    rango(tipoRango: string): void {
        this.tipoRango = tipoRango;
    }

    labels(): Array<any> {
        return this.lineChartLabels[this.tipoRango];
    }

}
