import {Component, Input, OnInit} from '@angular/core';
import {Notificacion} from './notificacion';
import {NotificacionesService} from './notificaciones.service';

@Component({
    selector: 'lab-notificaciones',
    moduleId: module.id,
    templateUrl: 'notificaciones.component.html'
})
export class NotificacionesComponent implements OnInit {
    // solicitud-insumos, reservas-equipos
    @Input() tiposNotificaciones: string[];
    // Con el usuario determinar que notificaciones corresponden a el
    // tanto por perfil o nombre directo
    @Input() usuario: string;

    notificaciones: Notificacion[];

    constructor(private _notificacionService: NotificacionesService) {
    }

    ngOnInit(): void {
        this.notificaciones = this._notificacionService.listNotificaciones();
    }
}