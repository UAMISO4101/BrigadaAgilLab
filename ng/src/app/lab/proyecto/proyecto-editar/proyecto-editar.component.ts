import {Component, OnInit} from "@angular/core";
import {ProyectoService} from "../service/proyecto.service";
import {LabelsService} from "../../labels.service";
import {NgForm} from "@angular/forms";
import {Proyecto} from "../service/proyecto";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: "proyecto-editar.component.html",
    providers: [ProyectoService, LabelsService]
})
export class ProyectoEditarComponent implements OnInit {
    _: {};
    idProyecto: string;
    proyecto: Proyecto;

    constructor(private _labelsService: LabelsService, private _proyectoService: ProyectoService,
                private router: Router,private route: ActivatedRoute, private _notif: NotificationsService) {
        this._ = _labelsService.getLabels();
        this.idProyecto = route.snapshot.params["id"];

    }
    private getProyectoForId(idProyecto : string){
        this._proyectoService
            .getProyecto(this.idProyecto)
            .subscribe(
                product => this.proyecto = product,
                error => console.log(<any>error));

        console.info(this.proyecto)
    }
    ngOnInit() : any {
        this.proyecto = <Proyecto>{'id':Number(this.idProyecto)};
        this.getProyectoForId(this.idProyecto);
    }

    guardar(): void {
        this.proyecto.descripcion =  this.proyecto.descripcion.trim();

        this._proyectoService.setProyecto(this.proyecto).subscribe(res => this.okNuevo(), error => this.errorNuevo(error));
    }

    okNuevo(): void {
        this._notif.success("Ok", "Proyecto Editado");
        this.router.navigate(["/proyecto"]);
    }

    errorNuevo(error): void {
        console.log(error);
        this._notif.error("Error en la Creación", error._body);
    }
}
