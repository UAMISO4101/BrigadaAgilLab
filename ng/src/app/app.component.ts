import {Component, NgZone} from "@angular/core";

declare var jQuery: any;

@Component({
    selector: "app-lab",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {

    constructor(private ngZone: NgZone) {
        this.menuSmallDisplay(window.innerWidth);
        window.onresize = (e) => {
            this.ngZone.run(() => {
                this.menuSmallDisplay(window.innerWidth);
            });
        };
    }

    menuSmallDisplay(width: number) {
        if (width < 769) {
            jQuery("body").addClass("body-small");
        } else {
            jQuery("body").removeClass("body-small");
        }
    }

}
