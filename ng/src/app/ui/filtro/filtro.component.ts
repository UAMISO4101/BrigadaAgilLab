import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from "@angular/core";
import {FormControl} from "@angular/forms";
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {FiltroPipe} from "../filtro.pipe";

@Component({
    selector: "app-filtro",
    templateUrl: "./filtro.component.html"
})
export class FiltroComponent implements OnInit {
    @Input() items: Observable<any[]>;
    @Input() filtrarPor: Array<string>;
    @Output() filtrado = new EventEmitter<Array<any>>();
    public _items: Array<any>;

    public placeholder: string;
    public filtroInput = new FormControl();
    private _subscription: Subscription;

    constructor(private filtroPipe: FiltroPipe) {
    }

    ngOnInit() {
        console.log("Subscribe");
        this._subscription = this.items.subscribe(res => this._items = res);

        this.placeholder = "Filtrar ...";
        this.filtroInput
            .valueChanges
            .debounceTime(1000)
            .subscribe(term => {
                console.log("antes de filtrar length" + this._items.length);
                console.log(this._items);
                const filtrado = this.filtroPipe.transform(this._items, term, this.filtrarPor);
                console.log("Filtrado");
                console.log(filtrado);
                this.filtrado.emit(filtrado);
            });
    }

}
