import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {LabModule} from './lab/lab.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NavigationComponent} from './layout/navigation.component';
import {TopNavBarComponent} from './layout/topnavbar.component';
import {FooterComponent} from './layout/footer.component';
import {SimpleNotificationsModule} from 'angular2-notifications/dist';

describe('AppComponent Main Layout', () => {
    let originalTimeout;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                FooterComponent,
                NavigationComponent,
                TopNavBarComponent,
            ],
            imports: [
                SimpleNotificationsModule.forRoot(),
                RouterTestingModule,
                LabModule ],
        }).compileComponents();
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    }));

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('debe crear app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('debe mostrar el menu', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('lab-navigation')).toBeTruthy();
    }));

    it('debe mostrar el encabezado', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('lab-top-nav-bar')).toBeTruthy();
    }));

    it('debe mostrar el pie de pagina', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('lab-footer')).toBeTruthy();
    }));
    it('debe contener las notificaciones', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('simple-notifications')).toBeTruthy();
    }));
    it('debe contener el router', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('router-outlet')).toBeTruthy();
    }));

});
