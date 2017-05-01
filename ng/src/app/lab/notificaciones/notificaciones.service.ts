import {Injectable} from '@angular/core';
import {Notificacion} from './notificacion';

@Injectable()
export class NotificacionesService {

    listNotificaciones(): Notificacion[] {
        return [
            {
                id: Date.now() + '',
                tipo: 'Insumo',
                titulo: 'METOXIETANOL',
                proyecto: 'Proyecto 1',
                experimento: 'Experimento 1',
                creador: 'Usuario 1',
                campos: {
                    'cantidad': '500 ml',
                },
                timestamp: Date.now()
            },
            {
                id: Date.now() + '',
                tipo: 'Insumo',
                titulo: 'OCTANOSULFONATO DE SODIO',
                proyecto: 'Proyecto 2',
                experimento: 'Experimento 2',
                creador: 'Usuario 3',
                campos: {
                    'cantidad': '25 gr',
                },
                timestamp: Date.now()
            }
        ];
    }
}