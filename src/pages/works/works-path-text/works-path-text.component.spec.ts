import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksPathTextComponent } from './works-path-text.component';

describe('AboutPathTextComponent', () => {
  let component: WorksPathTextComponent;
  let fixture: ComponentFixture<WorksPathTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksPathTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksPathTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
