import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'lab-form-field',
    templateUrl: './form-field.component.html'
})
export class FormFieldComponent implements OnInit {
    @Input() label: string;

    constructor() {
    }

    ngOnInit() {
    }

}
