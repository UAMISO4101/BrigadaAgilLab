import {Component, OnInit, ElementRef, AfterViewInit} from "@angular/core";

declare var jQuery: any;

@Component({
    selector: 'lab-navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit, AfterViewInit  {

    ngAfterViewInit(): void {
    }

    constructor(private _el: ElementRef) {
    }

    ngOnInit(): void {
        let elem = jQuery(this._el.nativeElement);
        elem.filter('#side-menu').metisMenu();
        elem.filter('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9
        });
    }


}