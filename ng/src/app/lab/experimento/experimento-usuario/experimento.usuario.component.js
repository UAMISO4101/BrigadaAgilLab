"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
Object.defineProperty(exports, "__esModule", {value: true});
var core_1 = require("@angular/core");
var usuario_service_1 = require("../service/usuario.service");
var UsuarioListComponent = (function () {
    function UsuarioListComponent(_usuarioService) {
        this._usuarioService = _usuarioService;
        this.usuarios = [];
    }

    UsuarioListComponent.prototype.getUsuarios = function () {
        var _this = this;
        this._usuarioService.getUsuarios().subscribe(function (usuarios) {
            return _this.usuarios = usuarios;
        });
    };
    UsuarioListComponent.prototype.ngOnInit = function () {
        this.getUsuarios();
    };
    return UsuarioListComponent;
}());
UsuarioListComponent = __decorate([
    core_1.Component({
        selector: "experimento-usuario",
        templateUrl: 'experimento.usuario.component.html',
        providers: [usuario_service_1.UsuarioService]
    })
], UsuarioListComponent);
exports.UsuarioListComponent = UsuarioListComponent;
