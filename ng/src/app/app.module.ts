import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Ng2CompleterModule } from "ng2-completer";

import { AppComponent } from './app.component';
import { FooterComponent } from "./layout/footer.component";
import { NavigationComponent } from "./layout/navigation.component";
import { TopNavBarComponent } from "./layout/topnavbar.component";
import { PanelControlComponent } from "./panel-control/panel-control.component";
import { PanelControlComponentJefe } from "./panel-control/panel-control-jefe.component";
import { LabModule } from "./lab/lab.module";
import { UIModule } from "./ui/ui.module";
import { PanelAsistenteComponent } from "./panel-control/panel-asistente.component";
import { PanelCientificoComponent } from "./panel-control/panel-cientifico.component";
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    declarations: [AppComponent,
        FooterComponent,
        NavigationComponent,
        TopNavBarComponent,
        PanelControlComponent,
        PanelControlComponentJefe,
        PanelCientificoComponent,
        PanelAsistenteComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ChartsModule,
        MultiselectDropdownModule,
        Ng2CompleterModule,
        RouterModule.forRoot([
            { path: 'panel-control', component: PanelControlComponent },
            { path: '', redirectTo: 'panel-control', pathMatch: 'full' },
            { path: '**', redirectTo: 'panel-control', pathMatch: 'full' },
        ]),
        LabModule,
        UIModule,
        SimpleNotificationsModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
