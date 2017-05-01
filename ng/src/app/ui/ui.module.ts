import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {iBoxToolsComponent} from './ibox-tools.component';
import {FormFieldComponent} from './form-field/form-field.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        iBoxToolsComponent,
        FormFieldComponent,
    ],
    exports: [
        iBoxToolsComponent,
        FormFieldComponent,
    ]

})
export class UIModule {

}