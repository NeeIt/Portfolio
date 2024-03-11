import { BehaviorSubject, catchError, of, take } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { RequestStates } from "@interfaces/request-states.interface";
import { IEmailParams } from "@interfaces/email.interface";
import { environment } from "@environments/environment";
import { Injectable } from "@angular/core";
import { GTM_EVENTS } from "@constants/base/gtm-events.const";
import { GtmService } from "@services/gtm.service";


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly _sendEmailRequestState = new BehaviorSubject(RequestStates.UNSET)
  readonly sendEmailRequestState$ = this._sendEmailRequestState.asObservable();

  constructor(
    private http: HttpClient,
    private gtmService: GtmService,
  ) {}

  sendMessage(emailParams: IEmailParams): void {
    this._sendEmailRequestState.next(RequestStates.PENDING);
    // this.http.post<boolean>(`${environment.backendPath}/api/email/send`, emailParams)
    //   .pipe(
    //     take(1),
    //     catchError((error: HttpErrorResponse) => {
    //       this._sendEmailRequestState.next(RequestStates.ERROR);
    //       return of();
    //     })).subscribe((response) => {
    //   this.gtmService.pushEvent(GTM_EVENTS.MESSAGE_SEND, emailParams);
    //   this._sendEmailRequestState.next(RequestStates.SUCCESS);
    //       console.log('Email sent successfully:', response);
    //   });

    const emailJsData = {
      service_id: 'service_i8hw3it',
      template_id: 'template_80svo6s',
      user_id: 'oF3savxa1cUwP74-c',
      template_params: emailParams
    }

    this.http.post<boolean>(`${environment.emailJsPath}/api/v1.0/email/send`, emailJsData).pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          this._sendEmailRequestState.next(RequestStates.ERROR);
          return of();
        })).subscribe((response) => {
      this.gtmService.pushEvent(GTM_EVENTS.MESSAGE_SEND, emailParams);
      this._sendEmailRequestState.next(RequestStates.SUCCESS);
          console.log('Email sent successfully:', response);
      });
  }
}
