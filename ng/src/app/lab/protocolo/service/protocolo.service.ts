import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Protocolo} from "./protocolo";
import {Insumo} from "../../insumos/insumo";
import {Herramienta} from "../../herramientas/service/herramienta";


@Injectable()
export class ProtocoloService {

    private url_servicios_protocolo = environment.url_servicios + "protocolo/";
    private url_servicios_protocolo_filtro_nombre = environment.url_servicios + "protocolo/filtro/";

    constructor(private _http: Http) {
    }

    getProtocolo(idProtocolo: string): Observable<Protocolo> {
        return this._http.get(this.url_servicios_protocolo + idProtocolo + "/")
            .map((response: Response) => <Protocolo>response.json());
    }

    nuevo(form): Observable<Protocolo[]> {
        return this._http.post(this.url_servicios_protocolo, form, this.buildHeaders())
            .map((response: Response) => <Protocolo[]>response.json());
    }

    listarProtocolos(): Observable<Protocolo[]> {
        console.log("listarProtocolos");
        return this._http.get(this.url_servicios_protocolo).map((response: Response) => <Protocolo[]>response.json());
    }

    listarProtocolosFiltradosNombre(nombre): Observable<Protocolo[]> {
        console.log("listarProtocolosFiltradosNombre");
        return this._http.get(this.url_servicios_protocolo_filtro_nombre + nombre)
            .map((response: Response) => <Protocolo[]>response.json());
    }

    listarProtocolosFiltradosEnExperimentoPorNombre(id_experimento, nombre): Observable<Protocolo[]> {
        let nombreEnviar = "%20";
        if (nombre !== "") {
            nombreEnviar = nombre;
        }
        return this._http.get(this.url_servicios_protocolo_filtro_nombre + id_experimento + "/" + nombreEnviar + "/")
            .map((response: Response) => <Protocolo[]>response.json());
    }

    asociarInsumoProtocolo(id_protocolo,id_insumo):Observable<Insumo[]>{

        return this._http.post(this.url_servicios_protocolo + id_protocolo + "/insumo/" + id_insumo + "/", this.buildHeaders())
            .map((response: Response)=><Insumo[]>response.json());
    }

    listarProtocoloInsumos(id_protocolo):Observable<Insumo[]>{

        return this._http.get(this.url_servicios_protocolo + id_protocolo + "/insumo/", this.buildHeaders())
            .map((response: Response)=><Insumo[]>response.json());

    }

    listarProtocoloHerramientas(id_protocolo):Observable<Herramienta[]>{

        return this._http.get(this.url_servicios_protocolo + id_protocolo + "/herramienta/", this.buildHeaders())
            .map((response: Response)=><Herramienta[]>response.json());

    }



    private buildHeaders() {
        const headers = new Headers({"Content-Type": "application/json"});
        const options = new RequestOptions(headers);
        return options;
    }

}
