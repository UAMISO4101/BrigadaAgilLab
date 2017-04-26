import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Proyecto} from './proyecto';
import {Experimento} from '../../experimento/service/experimento';
import {ExperimentoProyecto} from './proyecto-experimento';


@Injectable()
export class ProyectoService {
    private url_servicios_proyectos = environment.url_servicios + 'proyecto/';
    private url_servicios_proyecto_experimento = environment.url_servicios + 'proyecto/{0}/experimento/';

    constructor(private _http: Http) {
    }

    getProyecto(idProyecto: string): Observable<Proyecto> {
        return this._http.get(this.url_servicios_proyectos + idProyecto + '/')
            .map((response: Response) => <Proyecto>response.json());
    }

    getExperimentosProyecto(idProyecto: string): Observable<ExperimentoProyecto[]> {
        return this._http.get(this.url_servicios_proyecto_experimento.replace('{0}', idProyecto))
            .map((response: Response) => <ExperimentoProyecto[]>response.json());
    }

    getProyectos(): Observable<Proyecto[]> {
        return this._http.get(this.url_servicios_proyectos)
            .map((response: Response) => <Proyecto[]>response.json());

    }

    nuevoProyecto(form): Observable<Proyecto[]> {
        return this._http.post(this.url_servicios_proyectos, form, this.buildHeaders())
            .map((response: Response) => <Proyecto[]>response.json());
    }

    asociarExperimento(idProyecto: string, idExperimento: string): Observable<ExperimentoProyecto> {
        return this._http.post(
            this.url_servicios_proyecto_experimento.replace('{0}', idProyecto) + idExperimento + '/', {}, this.buildHeaders())
            .map((response: Response) => <ExperimentoProyecto>response.json());
    }

    private buildHeaders() {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions(headers);
        return options;
    }


    eliminarProyecto() {

    }
}
