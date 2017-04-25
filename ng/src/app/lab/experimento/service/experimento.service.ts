import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Experimento} from "./experimento";
import 'rxjs/add/operator/map';


@Injectable()
export class ExperimentoService {

  private url_servicios_experimentos = environment.url_servicios + "experimento/";

  constructor(private _http: Http) {
  }

  getExperimentos(): Observable<Experimento[]> {
    return this._http.get(this.url_servicios_experimentos)
        .map((response: Response) => <Experimento[]>response.json());
  }

  asociarProtocolo(item,protocolo):Observable<Experimento[]>{

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions(headers);
       return this._http.post(this.url_servicios_experimentos+item["id"]+"/protocolo/"+protocolo["id"],item,options).map(response=><Experimento[]>response.json());

    }

    getProtocolos(item):Observable<Response>{
       let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions(headers);
      return this._http.get(this.url_servicios_experimentos+item["id"]+"/protocolo/",options)
      .map(response=>response.json());
    }
}