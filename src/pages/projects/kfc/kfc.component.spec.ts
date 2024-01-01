import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KfcComponent } from './kfc.component';

describe('KfcComponent', () => {
  let component: KfcComponent;
  let fixture: ComponentFixture<KfcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KfcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
