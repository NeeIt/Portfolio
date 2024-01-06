import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {MyTranslateService} from "@services/translate.service";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {ModalService} from "@services/modals.service";
import {ICountryData} from "countries-list";
import {COUNTRIES_LIST} from "@constants/base/language.const";
import {FormBuilder} from "@angular/forms";
import {MODAL_NAMES} from "@interfaces/modals.interface";
import {TabIndexService} from "@services/tab-index.service";

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageModalComponent {
  private readonly subscriptions = new Subscription();

  tabIndexValues$ = this.tabIndexService.tabIndexValues$;

  countriesList = COUNTRIES_LIST;
  currentLang!: ICountryData | undefined;

  readonly searchForm = this.fb.group({
    search: [''],
  })

  constructor(
    private translateService: MyTranslateService,
    private tabIndexService: TabIndexService,
    private modalService: ModalService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    ) {
  }

  close(): void {
    this.modalService.closeModal(MODAL_NAMES.LANGUAGE);
  }

  changeLang(lang: string): void {
    if(!this.currentLang || this.currentLang.iso2 === lang || !lang) return;
    this.translateService.changeLang(lang.toUpperCase(), true);
    // this.close();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.translateService.currentLang$.subscribe((lang) => {
        this.currentLang = lang;
        this.cdr.markForCheck();
      })
    );

    this.subscriptions.add(
      this.searchForm.valueChanges.subscribe(val => {
        this.countriesList = COUNTRIES_LIST.filter(country =>
          !val.search
          || country.native.toLowerCase().includes(val.search.toLowerCase())
          || country.name.toLowerCase().includes(val.search.toLowerCase()))
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
