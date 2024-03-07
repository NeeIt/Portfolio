// TODO: Resolve unit test init error
//
// import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
//
// import { LanguageModalComponent } from './language-modal.component';
// import {ReactiveFormsModule} from "@angular/forms";
// import {TranslateModule, TranslateService} from "@ngx-translate/core";
// import {MatIconModule} from "@angular/material/icon";
// import {ModalService} from "@services/modals.service";
// import {TabIndexService} from "@services/tab-index.service";
// import {NO_ERRORS_SCHEMA} from "@angular/core";
//
// describe('LanguageModalComponent', () => {
//   let component: LanguageModalComponent;
//   let fixture: ComponentFixture<LanguageModalComponent>;
//
//   beforeEach(async () => {
//     const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);
//     const modalServiceSpy = jasmine.createSpyObj('ModalService', ['closeModal']);
//     const tabIndexServiceSpy = jasmine.createSpyObj('TabIndexService', ['tabIndexValues$']);
//
//     await TestBed.configureTestingModule({
//       declarations: [ LanguageModalComponent ],
//       imports: [
//         ReactiveFormsModule,
//         TranslateModule.forRoot(),
//         MatIconModule,
//       ],
//       providers: [
//         { provide: TranslateService, useValue: translateServiceSpy },
//         { provide: ModalService, useValue: modalServiceSpy },
//         { provide: TabIndexService, useValue: tabIndexServiceSpy },
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(waitForAsync(() => {
//     fixture = TestBed.createComponent(LanguageModalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
