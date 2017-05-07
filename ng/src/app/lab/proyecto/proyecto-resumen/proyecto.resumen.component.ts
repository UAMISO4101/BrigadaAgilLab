import {Component} from "@angular/core";
import {ProyectoService} from "../service/proyecto.service";

@Component({
    selector: "proyecto-detalle",
    templateUrl: "proyecto.resumen.component.html",
    providers: [ProyectoService]
})
export class ProyectoResumenComponent {

}
