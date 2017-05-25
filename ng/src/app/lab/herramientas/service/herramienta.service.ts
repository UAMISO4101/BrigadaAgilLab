import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Herramienta} from "./herramienta";


@Injectable()
export class HerramientaService {

    private url_servicios_herramienta = environment.url_servicios + "herramienta/";
    private url_servicios_herramienta_filtro_nombre = environment.url_servicios + "herramienta/filtro/";

    constructor(private _http: Http) {
    }

    nuevo(form): Observable<Herramienta[]> {
        return this._http.post(this.url_servicios_herramienta, form, this.buildHeaders())
            .map((response: Response) => <Herramienta[]>response.json());
    }

    listarHerramientas(): Observable<Herramienta[]> {
        console.log("listarHerramientas");
        return this._http.get(this.url_servicios_herramienta).map((response: Response) => <Herramienta[]>response.json());
    }

    listarHerramientasFiltroNombre(nombre): Observable<Herramienta[]> {
        console.log("listarHerramientasFiltroNombre");
        return this._http.get(this.url_servicios_herramienta_filtro_nombre + nombre)
            .map((response: Response) => <Herramienta[]>response.json());
    }

    private buildHeaders() {
        const headers = new Headers({"Content-Type": "application/json"});
        const options = new RequestOptions(headers);
        return options;
    }
}
