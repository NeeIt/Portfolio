import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPathTextComponent } from './contact-path-text.component';

describe('ContactPathTextComponent', () => {
  let component: ContactPathTextComponent;
  let fixture: ComponentFixture<ContactPathTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPathTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactPathTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
