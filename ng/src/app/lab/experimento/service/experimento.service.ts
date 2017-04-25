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
    return this._http.get(this.url_servicios_experimentos).map((response: Response) => <Experimento[]>response.json());
  }

}
