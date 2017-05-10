import {NgModule} from "@angular/core";
import {Ng2BreadcrumbModule, BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {ProyectoService} from "./proyecto/service/proyecto.service";
import {ProtocoloService} from "./protocolo/service/protocolo.service";
import {MuestraService} from "./muestra/muestra.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ProyectoAdjuntosComponent} from "./proyecto/proyecto-detalle/proyecto.adjuntos.component";
import {ProyectoInformacionBasicaComponent} from "./proyecto/proyecto-detalle/proyecto.informacion.basica.component";
import {ProyectoDetalleComponent} from "./proyecto/proyecto-detalle/proyecto.detalle.component";
import {ProyectoResumenComponent} from "./proyecto/proyecto-resumen/proyecto.resumen.component";
import {ProyectoListComponent} from "./proyecto/proyecto-listado/proyecto.list.component";
import {ExperimentoListComponent} from "./experimento/experimento-listado/experimento.list.component";
import {RouterModule} from "@angular/router";
import {ProtocoloComponent} from "./protocolo/protocolo.component";
import {ProtocoloNuevoComponent} from "./protocolo/nuevo/protocolo-nuevo.component";
import {ProtocoloBuscadorComponent} from "./protocolo/protocolo.buscador.component";
import {ProtocoloDetalleComponent} from "./protocolo/protocolo.detalle.component";
import {ProtocoloResumenComponent} from "./protocolo/protocolo.resumen.component";
import {HerramientaComponent} from "./herramientas/listar/herramienta.component";
import {HerramientaNuevaComponent} from "./herramientas/nueva/herramienta-nueva.component";
import {HerramientaService} from "./herramientas/service/herramienta.service";
import {NotificacionesComponent} from "./notificaciones/notificaciones.component";
import {NotificacionesService} from "./notificaciones/notificaciones.service";
import {EquiposComponent} from "./equipos/equipos.component";
import {EquiposService} from "./equipos/equipos.service";
import {InsumosComponent} from "./insumos/insumos.component";
import {InsumosService} from "./insumos/insumos.service";
import {ExperimentoDetalleComponent} from "./experimento/experimento-detalle/experimento.detalle.component";
import {ProyectoNuevoComponent} from "./proyecto/proyecto-nuevo/proyecto-nuevo.component";
import {InsumoNuevoComponent} from "./insumos/nuevo/insumo-nuevo.component";
import {ExperimentoNuevoComponent} from "./experimento/nuevo/experimento-nuevo.component";
import {ProyectoControladorComponent} from "./proyecto/proyecto-controlador/proyecto-controlador.component";
import {UIModule} from "../ui/ui.module";
import {LabelsService} from "./labels.service";
import {HttpModule} from "@angular/http";
import {ProyectoAsociarExpComponent} from "./proyecto/proyecto-experimento/proyecto.asociar.exp.component";
import {ExperimentoControladorComponent} from "./experimento/experimento-controlador/experimento-controlador.component";
import {ExperimentoAsociarProtocoloComponent} from "./experimento/experimento-asociar.protocolo/experimento.asociar.protocolo.component";
import {UsuarioListComponent} from "./experimento/experimento-usuario/experimento.usuario.component";
import {ExperimentoService} from "./experimento/service/experimento.service";
import {UsuarioService} from "./experimento/service/usuario.service";
import {ProyectoGraficaComponent} from "./proyecto/proyecto-grafica/proyecto.grafica.component";
import {ChartsModule} from "ng2-charts";
import {MultiselectDropdownModule} from "angular-2-dropdown-multiselect";
import {Ng2CompleterModule} from "ng2-completer";
import {SimpleNotificationsModule} from "angular2-notifications";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng2BreadcrumbModule,
        RouterModule.forChild([
            {path: "insumo", component: InsumosComponent},
            {path: "proyecto", component: ProyectoControladorComponent},
            {path: "proyecto/nuevo", component: ProyectoNuevoComponent},
            {path: "insumo/nuevo", component: InsumoNuevoComponent},
            {path: "proyecto/:id", component: ProyectoDetalleComponent},
            {path: "protocolo", component: ProtocoloComponent},
            {path: "protocolo/nuevo", component: ProtocoloNuevoComponent},
            {path: "experimento/nuevo", component: ExperimentoNuevoComponent},
            {path: "proyecto/:id/experimento", component: ProyectoAsociarExpComponent},
            {path: "experimento", component: ExperimentoControladorComponent},
            {path: "experimento/:id", component: ExperimentoDetalleComponent},
            {path: "proyecto/:id/experimento/:id/protocolos", component: ExperimentoAsociarProtocoloComponent},
            {path: "usuario", component: UsuarioListComponent},
            {path: "herramienta", component: HerramientaComponent},
            {path: "herramienta/nueva", component: HerramientaNuevaComponent},
            {path: "insumos", component: InsumosComponent}
        ]),
        UIModule,
        HttpModule,
        ChartsModule,
        MultiselectDropdownModule,
        Ng2CompleterModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [
        ProyectoInformacionBasicaComponent,
        ProyectoAdjuntosComponent,
        ProyectoDetalleComponent,
        ProtocoloComponent,
        ProtocoloNuevoComponent,
        ProtocoloBuscadorComponent,
        ProtocoloResumenComponent,
        HerramientaComponent,
        HerramientaNuevaComponent,
        ExperimentoDetalleComponent,
        ProtocoloDetalleComponent,
        ProyectoListComponent,
        UsuarioListComponent,
        ExperimentoListComponent,
        ProyectoResumenComponent,
        NotificacionesComponent,
        EquiposComponent,
        InsumosComponent,
        InsumoNuevoComponent,
        ProyectoNuevoComponent,
        ExperimentoNuevoComponent,
        ProyectoControladorComponent,
        ProyectoAsociarExpComponent,
        ExperimentoAsociarProtocoloComponent,
        ExperimentoControladorComponent,
        ProyectoGraficaComponent
    ],
    exports: [
        NotificacionesComponent,
        ProyectoInformacionBasicaComponent,
        ProtocoloBuscadorComponent,
        ExperimentoControladorComponent,
        ExperimentoDetalleComponent,
        ProtocoloNuevoComponent,
        ProtocoloDetalleComponent,
        ProtocoloResumenComponent,
        HerramientaComponent,
        HerramientaNuevaComponent,
        ProyectoAdjuntosComponent,
        ProyectoDetalleComponent,
        ProyectoListComponent,
        UsuarioListComponent,
        ExperimentoListComponent,
        ProyectoResumenComponent,
        EquiposComponent,
        InsumosComponent,
        InsumoNuevoComponent,
        ExperimentoNuevoComponent,
        ProyectoGraficaComponent

    ],
    providers: [
        BreadcrumbService,
        ProyectoService,
        ProtocoloService,
        MuestraService,
        ExperimentoService,
        NotificacionesService,
        EquiposService,
        InsumosService,
        LabelsService,
        UsuarioService,
        HerramientaService
    ]


})
export class LabModule {
    constructor(private breadcrumbService: BreadcrumbService) {
        breadcrumbService.addFriendlyNameForRoute("/proyecto", "Proyectos");
        breadcrumbService.addFriendlyNameForRoute("/proyecto/nuevo", "Nuevo Proyecto");
        breadcrumbService.addFriendlyNameForRouteRegex("/proyecto/[0-9]", "Detalle de Proyecto");
    }
}
