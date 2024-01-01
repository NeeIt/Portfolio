import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPathTextComponent } from './about-path-text.component';

describe('AboutPathTextComponent', () => {
  let component: AboutPathTextComponent;
  let fixture: ComponentFixture<AboutPathTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutPathTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPathTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
