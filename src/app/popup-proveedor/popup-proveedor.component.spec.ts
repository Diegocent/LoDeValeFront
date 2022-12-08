import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProveedorComponent } from './popup-proveedor.component';

describe('PopupProveedorComponent', () => {
  let component: PopupProveedorComponent;
  let fixture: ComponentFixture<PopupProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
