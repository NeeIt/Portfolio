import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTextPathComponent } from './navigation-text-path.component';

describe('NavigationTextPathComponent', () => {
  let component: NavigationTextPathComponent;
  let fixture: ComponentFixture<NavigationTextPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationTextPathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationTextPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
