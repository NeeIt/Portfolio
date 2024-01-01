import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCardV3Component } from './work-card-v3.component';

describe('WorkCardV3Component', () => {
  let component: WorkCardV3Component;
  let fixture: ComponentFixture<WorkCardV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCardV3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCardV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
