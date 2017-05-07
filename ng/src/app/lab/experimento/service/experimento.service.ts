import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Experimento} from "./experimento";
import "rxjs/add/operator/map";


@Injectable()
export class ExperimentoService {

    private url_servicios_experimentos = environment.url_servicios + "experimento/";
    private url_servicios_experimento_filtro = environment.url_servicios + "experimento/filtro/";

    constructor(private _http: Http) {
    }

    listarExperimentosFiltrados(filtro): Observable<Experimento[]> {
        console.log("listarProtocolosFiltrados");
        if (filtro !== "") {
            return this._http.get(this.url_servicios_experimento_filtro + filtro)
                .map((response: Response) => <Experimento[]>response.json());
        } else {
            return this._http.get(this.url_servicios_experimentos)
                .map((response: Response) => <Experimento[]>response.json());
        }

    }

    getExperimentos(): Observable<Experimento[]> {
        return this._http.get(this.url_servicios_experimentos)
            .map((response: Response) => <Experimento[]>response.json());
    }

    asociarProtocolo(item, protocolo): Observable<Experimento[]> {

        const headers = new Headers({"Content-Type": "application/json"});
        const options = new RequestOptions(headers);
        return this._http.post(this.url_servicios_experimentos + item["id"] + "/protocolo/" + protocolo["id"], item, options)
            .map(response => <Experimento[]>response.json());

    }

    getProtocolos(item): Observable<Response> {
        const headers = new Headers({"Content-Type": "application/json"});
        const options = new RequestOptions(headers);
        return this._http.get(this.url_servicios_experimentos + item["id"] + "/protocolo/", options)
            .map(response => response.json());
    }
}
