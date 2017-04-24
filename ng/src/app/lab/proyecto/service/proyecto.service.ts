import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Proyecto} from "./proyecto";
import 'rxjs/add/operator/map';


@Injectable()
export class ProyectoService {
    private url_servicios_proyectos = environment.url_servicios + "proyecto/";

    constructor(private _http: Http) {
    }

    getProyecto(idProyecto : string):Observable<Proyecto>{
        return this._http.get(this.url_servicios_proyectos+"/"+idProyecto+"/")
            .map((response: Response) => <Proyecto>response.json());
    }

    getProyectos(): Observable<Proyecto[]> {
        return this._http.get(this.url_servicios_proyectos)
            .map((response: Response) => <Proyecto[]>response.json());

    }

    nuevoProyecto(form): Observable<Proyecto[]> {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions(headers);
        return this._http.post(this.url_servicios_proyectos, form, options)
            .map((response: Response) => <Proyecto[]>response.json());
    }

    asociarProyecto(item): Observable<Proyecto[]> {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions(headers);
        return this._http.put(this.url_servicios_proyectos, item, options)
            .map((response: Response) => <Proyecto[]>response.json());
    }


    eliminarProyecto() {

    }
}
