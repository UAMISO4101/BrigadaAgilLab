import {Component, OnInit} from "@angular/core";
import {Equipo} from "./equipo";
import {EquiposService} from "./equipos.service";
declare var jQuery: any;

@Component({
    selector: 'lab-equipos',
    moduleId: module.id,
    templateUrl: 'equipos.component.html'
})
export class EquiposComponent implements OnInit {
    list: Equipo[] = [];
    search: string = '';
    checkEquipos: Object[] = [];
    selectedOrder: string = "-nombre";
    dateEquipos: Array<Object> = [];


    constructor(private _equipoService: EquiposService) {

    }

    ngOnInit(): void {
        this.createCalendar();
        this.getEquipos();
    }

    getEquipos() {

        this.list = this._equipoService.listEquipos(10, this.search, this.selectedOrder);
        this.checkEquipos = [];
        for (let d of this.list) {
            this.getDateCalendar(d.id);
        }
    }

    getDateCalendar(id: number) {

        var index = this.checkEquipos.findIndex(eq => eq['id'] === id);
        var equipos = this.list.filter(eq => eq['id'] == id);
        var equipo = equipos[0];
        if (index != -1 && !equipo.selected) {
            var p = this.checkEquipos.filter(eq => eq['id'] == id);
            this.checkEquipos.splice(index, p.length);
        } else {
            if (!equipo['color']) {
                equipo['color'] = this.getRandomColor();
            }
            for (let d of this._equipoService.getDateEquipos(equipo)) {
                this.checkEquipos.push(d);
            }
        }


        //this.dateEquipos = this._equipoService.getDateEquipos(this.checkEquipos)

        var myCalendar = jQuery('#calendar');
        myCalendar.fullCalendar('removeEvents');

        myCalendar.fullCalendar('addEventSource', this.checkEquipos);

    }

    createCalendar() {
        jQuery('#calendar').fullCalendar('destroy');
        jQuery('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            //columnFormat:'ddd M',
            allDaySlot: false,
            selectable: true,
            lang: 'es',
            minTime: "08:00:00",
            maxTime: "18:00:00",
            hiddenDays: [6, 0],
            defaultView: 'agendaWeek',
            firstDay: 1,
            editable: true,
            droppable: true,
            events: this.dateEquipos
        });
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


}