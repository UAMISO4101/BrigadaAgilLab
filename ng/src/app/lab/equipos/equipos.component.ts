import {Component, OnInit} from "@angular/core";
import {Equipo} from "./equipo";
import {EquiposService} from "./equipos.service";
import {HerramientaService} from "../herramientas/service/herramienta.service";
import {Herramienta} from "../herramientas/service/herramienta";

declare var jQuery: any;

@Component({
    selector: "lab-equipos",
    moduleId: module.id,
    templateUrl: "equipos.component.html"
})
export class EquiposComponent implements OnInit {
    list: Equipo[] = [];
    herramientas: Herramienta[] = [];
    search = "";
    checkEquipos: Object[] = [];
    selectedOrder = "-nombre";
    dateEquipos: Array<Object> = [];


    constructor(private _equipoService: EquiposService, private _herramientaService: HerramientaService) {
        this.getHerramientas();
    }

    ngOnInit(): void {
        this.createCalendar();
        this.getEquipos();

    }
    getHerramientas(){
        /*this._herramientaService.listarHerramientas()
                .subscribe((herramientas: Herramienta[]) => this.herramientas = herramientas);*/

        if (this.search !== "") {
            this._herramientaService.listarHerramientasFiltroNombre(this.search)
                .subscribe((herramientas: Herramienta[]) => this.herramientas = herramientas);
            console.log("get listarHerramientasFiltroNombre");
        } else {
            this._herramientaService.listarHerramientas()
                .subscribe((herramientas: Herramienta[]) => this.herramientas = herramientas);
            console.log("get listarHerramientas");
        }
    }
    getEquipos() {

        this.list = this._equipoService.listEquipos(10, this.search, this.selectedOrder);
        this.checkEquipos = [];
        for (const d of this.list) {
            this.getDateCalendar(d.id);
        }
    }

    getDateCalendar(id: number) {

        const index = this.checkEquipos.findIndex(eq => eq["id"] === id);
        const equipos = this.list.filter(eq => eq["id"] === id);
        const equipo = equipos[0];
        if (index !== -1 && !equipo.selected) {
            const p = this.checkEquipos.filter(eq => eq["id"] === id);
            this.checkEquipos.splice(index, p.length);
        } else {
            if (!equipo["color"]) {
                equipo["color"] = this.getRandomColor();
            }
            for (const d of this._equipoService.getDateEquipos(equipo)) {
                this.checkEquipos.push(d);
            }
        }


        // this.dateEquipos = this._equipoService.getDateEquipos(this.checkEquipos)

        const myCalendar = jQuery("#calendar");
        myCalendar.fullCalendar("removeEvents");

        myCalendar.fullCalendar("addEventSource", this.checkEquipos);

    }

    createCalendar() {
        jQuery("#calendar").fullCalendar("destroy");
        jQuery("#calendar").fullCalendar({
            header: {
                left: "prev,next today",
                center: "title",
                right: "month,agendaWeek,agendaDay"
            },
            // columnFormat:'ddd M',
            allDaySlot: false,
            selectable: true,
            lang: "es",
            minTime: "08:00:00",
            maxTime: "18:00:00",
            hiddenDays: [6, 0],
            defaultView: "agendaWeek",
            firstDay: 1,
            editable: true,
            droppable: true,
            events: this.dateEquipos
        });
    }

    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


}
