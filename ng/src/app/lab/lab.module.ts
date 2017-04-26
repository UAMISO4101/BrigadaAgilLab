import {NgModule} from "@angular/core";
import {ProyectoService} from "./proyecto/service/proyecto.service";
import {ProtocoloService} from "./protocolo/service/protocolo.service";
import {MuestraService} from "./muestra/muestra.service";
import {ExperimentoService} from "./experimento/experimento.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ProyectoAdjuntosComponent} from "./proyecto/proyecto-detalle/proyecto.adjuntos.component";
import {ProyectoInformacionBasicaComponent} from "./proyecto/proyecto-detalle/proyecto.informacion.basica.component";
import {ProyectoDetalleComponent} from "./proyecto/proyecto-detalle/proyecto.detalle.component";
import {ProyectoResumenComponent} from "./proyecto/proyecto-resumen/proyecto.resumen.component";
import {ProyectoListComponent} from "./proyecto/proyecto-listado/proyecto.list.component";
import {RouterModule} from "@angular/router";
import {ProtocoloComponent} from "./protocolo/protocolo.component";
import {ProtocoloBuscadorComponent} from "./protocolo/protocolo.buscador.component";
import {ProtocoloDetalleComponent} from "./protocolo/protocolo.detalle.component";
import {ProtocoloResumenComponent} from "./protocolo/protocolo.resumen.component";
import {NotificacionesComponent} from "./notificaciones/notificaciones.component"
import {NotificacionesService} from "./notificaciones/notificaciones.service";
import {KeysPipe} from "./keys.pipe";
import {EquiposComponent} from "./equipos/equipos.component";
import {EquiposService} from "./equipos/equipos.service";
import {InsumosComponent} from "./insumos/insumos.component";
import {InsumosService} from "./insumos/insumos.service";
import {ExperimentoBuscadorComponent} from "./experimento/experimento.buscador.component";
import {ExperimentoDetallesComponent} from "./experimento/experimento.detalles.component";
import {ProyectoNuevoComponent} from './proyecto/proyecto-nuevo/proyecto-nuevo.component';
import {ProyectoControladorComponent} from './proyecto/proyecto-controlador/proyecto-controlador.component';
import {UIModule} from "../ui/ui.module";
import {LabelsService} from "./labels.service";
import {HttpModule} from "@angular/http";
import {ProyectoAsociarExpComponent} from "./proyecto/proyecto-experimento/proyecto.asociar.exp.component";
import {ExperimentoAsociarProtocoloComponent} from "./experimento/experimento.asociar.protocolo.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: 'insumo', component: InsumosComponent},
            {path: 'proyecto', component: ProyectoControladorComponent},
            {path: 'proyecto/nuevo', component: ProyectoNuevoComponent},
            {path: 'proyecto/:id', component: ProyectoDetalleComponent},
            {path: 'protocolo', component: ProtocoloComponent},
            {path: 'proyecto/:id/experimento', component: ProyectoAsociarExpComponent},
            {path: 'experimento', component: ExperimentoBuscadorComponent},
            {path: 'proyecto/:id/experimento/:id/protocolos',component: ExperimentoAsociarProtocoloComponent}

        ]),
        UIModule,
        HttpModule,
    ],
    declarations: [
        ProyectoInformacionBasicaComponent,
        ProyectoAdjuntosComponent,
        ProyectoDetalleComponent,
        ProtocoloComponent,
        ProtocoloBuscadorComponent,
        ProtocoloResumenComponent,
        ExperimentoBuscadorComponent,
        ExperimentoDetallesComponent,
        ProtocoloDetalleComponent,
        ProyectoListComponent,
        ProyectoResumenComponent,
        NotificacionesComponent,
        KeysPipe,
        EquiposComponent,
        InsumosComponent,
        ProyectoNuevoComponent,
        ProyectoControladorComponent,
        ProyectoAsociarExpComponent,
        ExperimentoAsociarProtocoloComponent
    ],
    exports: [
        NotificacionesComponent,
        ProyectoInformacionBasicaComponent,
        ProtocoloBuscadorComponent,
        ExperimentoBuscadorComponent,
        ExperimentoDetallesComponent,
        ProtocoloDetalleComponent,
        ProtocoloResumenComponent,
        ProyectoAdjuntosComponent,
        ProyectoDetalleComponent,
        ProyectoListComponent,
        ProyectoResumenComponent,
        EquiposComponent,
        InsumosComponent

    ],
    providers: [
        ProyectoService,
        ProtocoloService,
        MuestraService,
        ExperimentoService,
        NotificacionesService,
        EquiposService,
        InsumosService,
        LabelsService
    ]


})
export class LabModule {

}
