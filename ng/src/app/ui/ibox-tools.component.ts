import {Component, Input, OnInit} from "@angular/core";

declare var jQuery: any;

@Component({
    selector: "ui-ibox-tools",
    moduleId: module.id,
    templateUrl: "./ibox-tools.component.html"
})
export class iBoxToolsComponent implements OnInit {
    @Input() collapse: boolean;
    @Input() fullscreen: boolean;
    @Input() close: boolean;

    ngOnInit(): void {

    }

    clickCollapse(event: Event): void {
        const elem = event.target;
        const ibox = jQuery(elem).closest("div.ibox");
        const button = jQuery(elem).find("i");
        const content = ibox.find("div.ibox-content");
        content.slideToggle(200);
        button.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down");
        ibox.toggleClass("").toggleClass("border-bottom");
        setTimeout(function () {
            ibox.resize();
            ibox.find("[id^=map-]").resize();
        }, 50);
    }
}
