import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {iBoxToolsComponent} from "./ibox-tools.component";
import {FormFieldComponent} from "./form-field/form-field.component";
import {FiltroComponent} from "./filtro/filtro.component";
import {FiltroPipe} from "./filtro.pipe";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        iBoxToolsComponent,
        FormFieldComponent,
        FiltroComponent,
        FiltroPipe,
    ],
    exports: [
        iBoxToolsComponent,
        FormFieldComponent,
        FiltroComponent,
    ],
    providers: [FiltroPipe]

})
export class UIModule {

}
