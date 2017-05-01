import {Component, Input, OnInit} from "@angular/core";

declare var jQuery: any;

@Component({
    selector: 'ui-ibox-tools',
    moduleId: module.id,
    templateUrl: './ibox-tools.component.html'
})
export class iBoxToolsComponent implements OnInit {
    @Input() collapse: boolean;
    @Input() fullscreen: boolean;
    @Input() close: boolean;

    ngOnInit(): void {

    }

    clickCollapse(event: Event): void {
        var elem = event.target;
        var ibox = jQuery(elem).closest('div.ibox');
        var button = jQuery(elem).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    }
}