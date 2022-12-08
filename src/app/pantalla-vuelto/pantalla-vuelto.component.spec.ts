import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaVueltoComponent } from './pantalla-vuelto.component';

describe('PantallaVueltoComponent', () => {
  let component: PantallaVueltoComponent;
  let fixture: ComponentFixture<PantallaVueltoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaVueltoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaVueltoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
