"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PanelControlComponent = (function () {
    function PanelControlComponent() {
        this.panelSeleccionado = 'cientifico';
    }
    return PanelControlComponent;
}());
PanelControlComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'panel-control.component.html'
    })
], PanelControlComponent);
exports.PanelControlComponent = PanelControlComponent;
//# sourceMappingURL=panel-control.component.js.map