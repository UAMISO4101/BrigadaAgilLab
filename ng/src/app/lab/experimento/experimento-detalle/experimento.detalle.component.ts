import {Component, OnInit, Directive, Output, EventEmitter, Input, SimpleChange} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ExperimentoService} from "../service/experimento.service";
import {UsuarioService} from "../service/usuario.service";
import {Experimento} from "../service/experimento";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Usuario} from "../service/usuario";


@Component({
  templateUrl: 'experimento.detalle.component.html',
  providers: [ExperimentoService]
})
export class ExperimentoDetalleComponent implements OnInit {
  private idExperimento: string;
  public experimento: Experimento[] = [];


  constructor(route: ActivatedRoute, private _experimentoService: ExperimentoService) {
    this.idExperimento = route.snapshot.params['id'];

  }

  getExperimento() {
    this._experimentoService
      .getExperimentos()
      .subscribe((experimentos: Experimento[]) =>
          this.experimento = JSON.parse(JSON.stringify(experimentos.filter(p => p.id == this.idExperimento)
            .pop())),
        error => console.log(error),
        () => console.log(this.experimento));
  }

  ngOnInit(): any {
    this.getExperimento();
  }
}

@Component({
   selector: 'myApp',
   template: `<select [(ngModel)]="selectedValue">
                 <option *ngFor="let c of model" value=c.id>prueba</option>
              </select>`,
    providers: [UsuarioService]
})
export class AppComponent{
    public usuario: Usuario[] = [];

    constructor(route: ActivatedRoute, private _usuarioService: UsuarioService) {
  }

    getUsuario() {
    this._usuarioService
      .getUsuarios()
      .subscribe((usuarios: Usuario[]) =>
          this.usuario = JSON.parse(JSON.stringify(usuarios))
            .pop()),
        error => console.log(error),
        () => console.log(this.usuario);
  }

  ngOnInit(): any {
    this.getUsuario();
  }
  selectedValue=null
}
