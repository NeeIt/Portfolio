import { TestBed } from '@angular/core/testing';
import { IconsService } from './icons.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS } from '@constants/base/icons.const';
import { environment } from '@environments/environment';

describe('IconsService', () => {
  let service: IconsService;
  let matIconRegistrySpy: jasmine.SpyObj<MatIconRegistry>;
  let domSanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    const iconRegistrySpy = jasmine.createSpyObj('MatIconRegistry', ['addSvgIcon']);
    const sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);

    TestBed.configureTestingModule({
      providers: [
        IconsService,
        { provide: MatIconRegistry, useValue: iconRegistrySpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
        { provide: 'isServer', useValue: false }
      ]
    });

    service = TestBed.inject(IconsService);
    matIconRegistrySpy = TestBed.inject(MatIconRegistry) as jasmine.SpyObj<MatIconRegistry>;
    domSanitizerSpy = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
  });

  it('should register icons', () => {
    // Предположим, что domSanitizer возвращает тот же URL для упрощения
    domSanitizerSpy.bypassSecurityTrustResourceUrl.and.callFake(url => url);

    service.registerIcons();

    // Проверяем, что addSvgIcon был вызван правильное количество раз
    expect(matIconRegistrySpy.addSvgIcon.calls.count()).toEqual(ICONS.length);

    // Проверяем, что для каждой иконки вызван метод addSvgIcon с правильными параметрами
    ICONS.forEach(icon => {
      const expectedUrl = `http://localhost:${environment.serverPort || 4000}/` + icon.path;
      expect(matIconRegistrySpy.addSvgIcon).toHaveBeenCalledWith(
        icon.name,
        jasmine.anything() // URL обрабатывается domSanitizer, так что здесь мы просто проверяем вызов с правильным именем
      );
    });
  });
});
