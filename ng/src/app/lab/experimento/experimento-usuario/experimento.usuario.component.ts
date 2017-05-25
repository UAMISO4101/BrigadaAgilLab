import {Component, OnInit} from "@angular/core";
import {UsuarioService} from "../service/usuario.service";
import {Usuario} from "../service/usuario";

@Component({
    selector: "experimento-usuario",
    templateUrl: "experimento.usuario.component.html",
    providers: [UsuarioService]
})
export class UsuarioListComponent implements OnInit {
    public usuarios: Usuario[] = [];

    constructor(private _usuarioService: UsuarioService) {
    }

    getUsuarios() {
        this._usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => this.usuarios = usuarios);
    }

    ngOnInit(): any {
        this.getUsuarios();
    }
}
