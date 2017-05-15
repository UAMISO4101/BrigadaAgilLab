import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloDetalleComponent } from './protocolo-detalle.component';

describe('ProtocoloDetalleComponent', () => {
  let component: ProtocoloDetalleComponent;
  let fixture: ComponentFixture<ProtocoloDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocoloDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocoloDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
