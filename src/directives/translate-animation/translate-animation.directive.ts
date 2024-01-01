import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {MyTranslateService} from "@services/translate.service";
import {skip, Subscription} from "rxjs";
import {AdaptiveService} from "@services/adaptive.service";
import {TranslateService} from "@ngx-translate/core";

@Directive({
  selector: '[appTranslateAnimation]'
})
export class TranslateAnimationDirective implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  domElement: any;
  height = 0;
  isElementWrapped = false;

  constructor(
    private readonly translateService: MyTranslateService,
    private readonly adaptiveService: AdaptiveService,
    private readonly translate: TranslateService,
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef,
    private readonly renderer: Renderer2,
    @Inject('isServer') private isServer: boolean,
  ) { }

  private translateAnimate(): void {
    this.calcHeight();
    if(!this.isElementWrapped) {
      this.wrapElement();
    }
    this.renderer.removeClass(this.domElement, 'change-language-animation-end');
    this.renderer.addClass(this.domElement, 'change-language-animation-start');
    this.cdr.markForCheck();
  }

  private removeAnimation(): void {
    this.renderer.removeClass(this.domElement, 'change-language-animation-start');
    this.renderer.addClass(this.domElement, 'change-language-animation-end');
    this.cdr.markForCheck();
  }

  // TODO: Documentation for methods
  // TODO: Unit tests for methods
  private wrapElement(): void {
    const wrapper = document.createElement('div');
    wrapper.className = 'lang-animation-wrapper';
    wrapper.style.height = `${this.domElement.offsetHeight || this.domElement.clientHeight}px`;
    this.domElement.parentNode.replaceChild(wrapper, this.domElement);
    wrapper.append(this.domElement);
    this.isElementWrapped = true;
    this.cdr.markForCheck();
  }


  private calcHeight(): number {
    const height = this.domElement.offsetHeight || this.domElement.clientHeight;
    if(this.height !== height) {
      this.height = height;
      this.domElement.style.setProperty('--target-height', `${height}px`);
    }
    return height
  }

  private subscribeEmitters(): void {
    this.subscriptions.add(
      this.translateService.currentLang$
        .pipe(skip(1))
        .subscribe((val) => {
          this.translateAnimate();
        })
    );
    this.subscriptions.add(
      this.translate.onLangChange.subscribe(() => {
        this.removeAnimation()
      })
    );

  }

  ngOnInit(): void {
    // we do not need to animate on Server (we do not even have correct DOM)
    if(this.isServer) return;
    this.subscribeEmitters();

    this.domElement = this.elementRef.nativeElement;

    // Angular not always correctly detect elements height
    const height = this.calcHeight();
    if(height) {
      this.wrapElement();
    }

    if(getComputedStyle(this.domElement).display === 'inline') this.domElement.style.display = 'inline-block';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
