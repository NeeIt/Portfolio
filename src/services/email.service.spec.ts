import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmailService } from './email.service';
import { RequestStates } from '@interfaces/request-states.interface';
import { GTM_EVENTS } from '@constants/base/gtm-events.const';
import { GtmService } from '@services/gtm.service';
import { environment } from '@environments/environment';
import {IEmailParams} from "@interfaces/email.interface";

describe('EmailService', () => {
  let service: EmailService;
  let httpMock: HttpTestingController;
  let gtmServiceSpy: jasmine.SpyObj<GtmService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GtmService', ['pushEvent']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmailService,
        { provide: GtmService, useValue: spy }
      ]
    });

    service = TestBed.inject(EmailService);
    httpMock = TestBed.inject(HttpTestingController);
    gtmServiceSpy = TestBed.inject(GtmService) as jasmine.SpyObj<GtmService>;
  });

  afterEach(() => {
    httpMock.verify(); // Убедитесь, что нет невыполненных запросов
  });

  it('should send message and set request state to SUCCESS', () => {
    const emailParams: IEmailParams = { from: 'test@example.com', name: 'Test', message: 'This is a test' };
    service.sendMessage(emailParams);

    const req = httpMock.expectOne(`${environment.backendPath}/api/email/send`);
    expect(req.request.method).toBe('POST');
    req.flush(true); // Эмулируем успешный ответ

    service.sendEmailRequestState$.subscribe(state => {
      expect(state).toEqual(RequestStates.SUCCESS);
    });

    expect(gtmServiceSpy.pushEvent).toHaveBeenCalledWith(GTM_EVENTS.MESSAGE_SEND, emailParams);
  });

  it('should handle HTTP error', () => {
    const emailParams: IEmailParams = { from: 'test@example.com', name: 'Test', message: 'This is a test' };

    service.sendMessage(emailParams);

    const req = httpMock.expectOne(`${environment.backendPath}/api/email/send`);
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' }); // Эмулируем ошибку сервера

    service.sendEmailRequestState$.subscribe(state => {
      expect(state).toEqual(RequestStates.ERROR);
    });
  });
});
