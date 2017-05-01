import {Component, ElementRef, OnInit} from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'lab-top-nav-bar',
    moduleId: module.id,
    templateUrl: 'topnavbar.component.html'
})
export class TopNavBarComponent implements OnInit {
    constructor(private _el: ElementRef) {

    }

    ngOnInit(): void {

    }

    minimizeNavbar(event: Event) {
        event.preventDefault();
        jQuery('body').toggleClass('mini-navbar');
        this.smoothlyMenu();
    }

    smoothlyMenu(): void {
        if (!jQuery('body').hasClass('mini-navbar') || jQuery('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            jQuery('#side-menu').hide();
            // For smoothly turn on menu
            setTimeout(
                function () {
                    jQuery('#side-menu').fadeIn(400);
                }, 200);
        } else if (jQuery('body').hasClass('fixed-sidebar')) {
            jQuery('#side-menu').hide();
            setTimeout(
                function () {
                    jQuery('#side-menu').fadeIn(400);
                }, 100);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            jQuery('#side-menu').removeAttr('style');
        }
    }

}