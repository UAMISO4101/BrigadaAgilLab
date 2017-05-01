import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Usuario} from './usuario';
import 'rxjs/add/operator/map';


@Injectable()
export class UsuarioService {
    private url_servicios_usuarios = environment.url_servicios + 'usuario/';

    constructor(private _http: Http) {
    }

    getUsuarios(): Observable<Usuario[]> {
        return this._http.get(this.url_servicios_usuarios).map((response: Response) => <Usuario[]>response.json());
    }

}
