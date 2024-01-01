import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPhotoComponent } from './index-photo.component';

describe('IndexPhotoComponent', () => {
  let component: IndexPhotoComponent;
  let fixture: ComponentFixture<IndexPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
