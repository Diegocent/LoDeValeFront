import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCierreComponent } from './reporte-cierre.component';

describe('ReporteCierreComponent', () => {
  let component: ReporteCierreComponent;
  let fixture: ComponentFixture<ReporteCierreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteCierreComponent]
    });
    fixture = TestBed.createComponent(ReporteCierreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
