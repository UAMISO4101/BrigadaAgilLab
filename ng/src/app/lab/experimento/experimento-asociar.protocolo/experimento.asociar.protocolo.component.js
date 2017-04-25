"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var experimento_service_1 = require("../service/experimento.service");
var protocolo_service_1 = require("../../protocolo/service/protocolo.service");
var ExperimentoAsociarProtocoloComponent = (function () {
    function ExperimentoAsociarProtocoloComponent(_experimentoService, _protocoloService, route) {
        this._experimentoService = _experimentoService;
        this._protocoloService = _protocoloService;
        this.protocolo = [];
        this.protocolos = [];
        this.idExperimento = route.snapshot.params['id'];
    }
    ExperimentoAsociarProtocoloComponent.prototype.onSelect = function (item) {
        this.protocolo = item;
        this.show = "true";
    };
    ExperimentoAsociarProtocoloComponent.prototype.getProtocolos = function () {
        var _this = this;
        this._protocoloService.listarProtocolos().subscribe(function (protocolos) { return _this.protocolos = protocolos; });
    };
    ExperimentoAsociarProtocoloComponent.prototype.getExperimento = function () {
        var _this = this;
        this._experimentoService.getExperimentos().subscribe(function (experimento) {
            return _this.experimento = experimento.filter(function (p) { return p.id == _this.idExperimento; }).pop();
        }, function (error) { return console.log(error); }, function () { return _this.asociarProtocolo(_this.experimento, _this.protocolo); });
    };
    ExperimentoAsociarProtocoloComponent.prototype.asociarProtocolo = function (experimento, protocolo) {
        if (!experimento["protocolos"])
            experimento["protocolos"] = [];
        experimento["protocolos"].push(protocolo);
        this._experimentoService.asociarProtocolo(experimento, protocolo).subscribe(function (res) { return console.log("success"); }, function (error) { return console.log(error); }, function () { return window.history.back(); });
    };
    ExperimentoAsociarProtocoloComponent.prototype.ngOnInit = function () {
        this.getProtocolos();
        window.scrollTo(0, 0);
    };
    return ExperimentoAsociarProtocoloComponent;
}());
ExperimentoAsociarProtocoloComponent = __decorate([
    core_1.Component({
        selector: 'experimento-protocolo',
        moduleId: module.id,
        templateUrl: 'experimento.asociar.protocolo.component.html',
        providers: [protocolo_service_1.ProtocoloService, experimento_service_1.ExperimentoService]
    })
], ExperimentoAsociarProtocoloComponent);
exports.ExperimentoAsociarProtocoloComponent = ExperimentoAsociarProtocoloComponent;
