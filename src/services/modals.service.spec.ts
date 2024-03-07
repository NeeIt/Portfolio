import { TestBed } from '@angular/core/testing';
import { ModalService } from './modals.service';
import { ViewContainerRef } from '@angular/core';
import { TabIndexService } from '@services/tab-index.service';
import { UtilsService } from '@services/utils.service';
import { MODAL_NAMES, MODALS_CONNECTION } from '@interfaces/modals.interface';
import { TAB_INDEX_MODE } from '@constants/base/tab-indexes.const';

describe('ModalService', () => {
  let service: ModalService;
  let mockTabIndexService: jasmine.SpyObj<TabIndexService>;
  let mockUtilService: jasmine.SpyObj<UtilsService>;
  let mockViewContainerRef: jasmine.SpyObj<ViewContainerRef>;

  beforeEach(() => {
    mockTabIndexService = jasmine.createSpyObj('TabIndexService', ['setTabIndexMode', 'restorePreviousTabIndex']);
    mockUtilService = jasmine.createSpyObj('UtilsService', ['someUtilityFunction']); // Пример функции, если используется
    mockViewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['createComponent', 'remove']);

    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: TabIndexService, useValue: mockTabIndexService },
        { provide: UtilsService, useValue: mockUtilService },
        { provide: ViewContainerRef, useValue: mockViewContainerRef }
      ]
    });

    service = TestBed.inject(ModalService);
  });

  it('should register container', () => {
    const mockContainer: ViewContainerRef = {} as any;
    service.registerModals(mockContainer);
    expect(service.container).toEqual(mockContainer);
  });

  it('should open a modal and set tabindex', () => {
    service.registerModals(mockViewContainerRef);
    const modalName = MODAL_NAMES.TEST; // Предположим, что SOME_MODAL это действующий элемент из MODAL_NAMES
    const result = service.openModal(modalName);

    expect(result).toBeTruthy();
    expect(mockTabIndexService.setTabIndexMode).toHaveBeenCalledWith(TAB_INDEX_MODE.MODAL);
    expect(mockViewContainerRef.createComponent).toHaveBeenCalled();
  });

  it('should close the latest modal', () => {
    service.registerModals(mockViewContainerRef);
    // Сначала нужно открыть модальное окно, чтобы было что закрывать
    service.openModal(MODAL_NAMES.TEST);
    const result = service.closeLatestModal();

    expect(result).toBeTrue();
    expect(mockViewContainerRef.remove).toHaveBeenCalled();
  });

  it('should close a specific modal by name', () => {
    service.registerModals(mockViewContainerRef);
    service.openModal(MODAL_NAMES.TEST);
    const closeModalResult = service.closeModal(MODAL_NAMES.TEST);

    expect(closeModalResult).toBeTrue();
    expect(mockViewContainerRef.remove).toHaveBeenCalled();
    expect(mockTabIndexService.restorePreviousTabIndex).toHaveBeenCalled();
  });
});
