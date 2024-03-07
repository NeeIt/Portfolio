import { TestBed } from '@angular/core/testing';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;
  let renderer2Spy: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    const rendererFactorySpy = jasmine.createSpyObj('RendererFactory2', ['createRenderer']);
    renderer2Spy = jasmine.createSpyObj('Renderer2', ['setStyle', 'removeStyle']);

    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        { provide: RendererFactory2, useValue: rendererFactorySpy },
      ],
    });

    rendererFactorySpy.createRenderer.and.returnValue(renderer2Spy);
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('disableGlobalScroll should set body styles to disable scroll', () => {
    service.disableGlobalScroll();
    expect(renderer2Spy.setStyle).toHaveBeenCalledTimes(5);
    expect(renderer2Spy.setStyle).toHaveBeenCalledWith(document.body, 'position', 'fixed');
    expect(renderer2Spy.setStyle).toHaveBeenCalledWith(document.body, 'top', jasmine.any(String));
    expect(renderer2Spy.setStyle).toHaveBeenCalledWith(document.body, 'left', '0');
    expect(renderer2Spy.setStyle).toHaveBeenCalledWith(document.body, 'right', '0');
    expect(renderer2Spy.setStyle).toHaveBeenCalledWith(document.body, 'overflow-y', 'hidden');
  });

  it('enableGlobalScroll should remove body styles and enable scroll', () => {
    service.enableGlobalScroll();
    expect(renderer2Spy.removeStyle).toHaveBeenCalledTimes(5);
    expect(renderer2Spy.removeStyle).toHaveBeenCalledWith(document.body, 'position');
    expect(renderer2Spy.removeStyle).toHaveBeenCalledWith(document.body, 'top');
    expect(renderer2Spy.removeStyle).toHaveBeenCalledWith(document.body, 'left');
    expect(renderer2Spy.removeStyle).toHaveBeenCalledWith(document.body, 'right');
    expect(renderer2Spy.removeStyle).toHaveBeenCalledWith(document.body, 'overflow-y');
  });
});
