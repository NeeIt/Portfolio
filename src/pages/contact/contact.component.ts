import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {EmailService} from "@services/email.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IEmailParams} from "@interfaces/email.interface";
import {SOCIAL_TYPES} from "@constants/contacts/socials.const";
import {RequestStates} from "@interfaces/request-states.interface";
import {TabIndexService} from "@services/tab-index.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', './contact.component.media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, OnDestroy{
  private readonly subscriptions = new Subscription();

  contactForm!: FormGroup;
  sendEmailRequestState$ = this.emailService.sendEmailRequestState$;

  readonly requestStates = RequestStates;
  readonly socials = Object.entries(SOCIAL_TYPES);
  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;

  constructor(
    private readonly tabIndexService: TabIndexService,
    private readonly emailService: EmailService,
    private readonly fb: FormBuilder,
    @Inject('isServer') private readonly isServer: boolean,
  ) {
    this.initForm();
  }

  sendEmail(formData: IEmailParams): void {
    this.emailService.sendMessage(formData)
  }

  initForm(): void {
    let email, phone, name, message = '';

    if(!this.isServer) {
      const itemFromLocalStorage = localStorage.getItem('contact-form');
      if (itemFromLocalStorage) {
        const changes = JSON.parse(itemFromLocalStorage);
        email = changes.email;
        name = changes.name;
        message = changes.message;
        phone = changes.phone;
      }
    }

    this.contactForm = this.fb.group({
      'email': [email, [Validators.required, Validators.email]],
      'phone': [phone],
      'name': [name, [Validators.required]],
      'message': [message, [Validators.required]],
    });
  }

  onSubmit() {
    this.contactForm.controls['email'].disable()
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.sendEmail({
        name: formData.name || '',
        phone: formData.phone || '',
        from: formData.email || '',
        message: formData.message || '',
      });
    }
  }

  ngOnInit(): void {
    if(this.isServer) return;

    this.subscriptions.add(
      this.contactForm.valueChanges.subscribe(values => {
      localStorage.setItem('contact-form', JSON.stringify(values));
    })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
