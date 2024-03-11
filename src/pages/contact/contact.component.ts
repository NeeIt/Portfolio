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

  public error: string | null = null;

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
      'email': [email, [Validators.required, Validators.email, Validators.maxLength(500)]],
      'phone': [phone, [Validators.maxLength(30)]],
      'name': [name, [Validators.required, Validators.maxLength(500)]],
      'message': [message, [Validators.required, Validators.maxLength(2500)]],
    });

    this.contactForm.valueChanges.subscribe(() => this.updateError());
  }

  updateError(): void {
    this.error = null; // Reset the error message before checking for new errors
    const controls = this.contactForm.controls;

    if (controls['email'].touched || controls['email'].dirty) {
      if (controls['email'].errors?.['required']) {
        this.error = 'PAGES.CONTACTS.FORM.ERRORS.EMAIL.REQUIRED';
      } else if (controls['email'].errors?.['email']) {
        this.error = 'PAGES.CONTACTS.FORM.ERRORS.EMAIL.INVALID';
      } else if (controls['email'].errors?.['maxlength']) {
        this.error = 'PAGES.CONTACTS.FORM.ERRORS.EMAIL.MAX';
      }
    }

    if (!this.error && (controls['phone'].touched || controls['phone'].dirty) && controls['phone'].errors?.['maxlength']) {
      this.error = 'PAGES.CONTACTS.FORM.ERRORS.PHONE.MAX';
    }

    if (!this.error && (controls['name'].touched || controls['name'].dirty)) {
      if (controls['name'].errors?.['required']) {
        this.error = 'PAGES.CONTACTS.FORM.ERRORS.NAME.REQUIRED';
      } else if (controls['name'].errors?.['maxlength']) {
        this.error = 'PAGES.CONTACTS.FORM.ERRORS.NAME.MAX';
      }
    }

    if (!this.error && (controls['message'].touched || controls['message'].dirty)) {
      if (controls['message'].errors?.['required']) {
        this.error = 'PAGES.CONTACTS.FORM.ERRORS.MESSAGE.REQUIRED';
      } else if (controls['message'].errors?.['maxlength']) {
        this.error = 'PAGES.CONTACTS.FORM.ERRORS.MESSAGE.MAX';
      }
    }
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
