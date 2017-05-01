import {Injectable} from "@angular/core";
import {Equipo} from "./equipo";

@Injectable()
export class EquiposService {

    listEquipos(number: number, search: string, order: string): Equipo[] {

        let items: Array<Equipo> = [];
        for (var i = 1; i <= number; i++) {
            var nombre = 'Equipo ' + i;
            var proyecto = 'Proyecto ' + i;
            if (nombre.indexOf(search) != -1 || search.trim().length == 0) {
                items.push({
                    id: i,
                    nombre: nombre,
                    proyecto: proyecto,
                    selected: true,
                    imagen: this.getImagen()
                });
            }
        }

        items = items.sort(this.dynamicSort(order))
        return items;

    }

    dynamicSort(property: string) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a: Equipo, b: Equipo) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    getDateEquipos(equipo: Object) {
        let dateEquipo: Array<Object> = [];


        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        var alt = Math.round(Math.random() * (4 - 1) + 1);

        for (var i = 0; i <= alt; i++) {
            var temp = Math.round(Math.random() * (2 - 1) + 1);

            var diaInit = Math.round(Math.random() * (5 - 0) + 0);
            var diaFin = Math.round(Math.random() * (5 - 0) + 0);

            if (temp == 1) {
                diaInit = -diaInit;
            }

            var hourInit = Math.round(Math.random() * (18 - 8) + 8);
            dateEquipo.push({
                id: equipo['id'],
                title: equipo['proyecto'],
                start: new Date(y, m, d + diaInit, hourInit, 0),
                end: new Date(y, m, d + diaInit, hourInit + 1, 0),
                color: equipo['color'],
                allDay: false
            })
        }


        /*dateEquipo = [
         {
         title: 'All Day Event',
         start: new Date(y, m, 1)
         },
         {
         title: 'Long Event',
         start: new Date(y, m, d-5),
         end: new Date(y, m, d-2)
         },
         {
         id: 999,
         title: 'Repeating Event',
         start: new Date(y, m, d-3, 16, 0),
         allDay: false
         },
         {
         id: 999,
         title: 'Repeating Event',
         start: new Date(y, m, d+4, 16, 0),
         allDay: false
         },
         {
         title: 'Meeting',
         start: new Date(y, m, d, 10, 30),
         allDay: false
         },
         {
         title: 'Lunch',
         start: new Date(y, m, d, 12, 0),
         end: new Date(y, m, d, 14, 0),
         allDay: false
         },
         {
         title: 'Birthday Party',
         start: new Date(y, m, d+1, 19, 0),
         end: new Date(y, m, d+1, 22, 30),
         allDay: false
         },
         {
         title: 'Click for Google',
         start: new Date(y, m, 28),
         end: new Date(y, m, 29),
         url: 'http://google.com/'
         }
         ];*/
        return dateEquipo;

    }

    getImagen() {
        var temp = Math.round(Math.random() * (5 - 1) + 1);
        var img = "http://actualbiotec.com/wp-content/uploads/2014/12/quimica_sanguinea_1-128x128.jpg";
        switch (temp) {
            case 2:
                img = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQDBRE_ee5Dj6Lc9bYZhoWC7IGgkkIBzMNUSf7eA5_mDebucQbh";
                break;
            case 1:
                img = "http://www.lozar.net/~qcd_lozar/fotos/D-6_mini.jpg";
                break;
            case 3:
                img = "http://actualbiotec.com/wp-content/uploads/2016/11/Bomba_infusi%C3%B3n_B_Braun-128x128.jpg";
                break;
            case 4:
                img = "http://www.aguaazulinternacional.com.mx/images/home_1_05.jpg";
                break;
            case 5:
                img = "http://actualbiotec.com/wp-content/uploads/2014/12/hematologia_d-128x128.jpg";
                break;
        }
        return img;
    }


}