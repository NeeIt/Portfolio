import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnInit,
  Optional
} from '@angular/core';
import {AdaptiveService} from "@services/adaptive.service";
import {RESPONSE} from "@nguniversal/express-engine/tokens";
import {DEFAULT_LANGUAGE} from "@constants/base/language.const";
import {MyTranslateService} from "@services/translate.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {
  readonly currentLang$ = this.translateService.currentLang$;

  readonly defaultLang = DEFAULT_LANGUAGE;

  easterEggApplied = false;

  paralaxElements = [
    {value:50, size: 20, x:0, y:0, xStart: '39%',  yStart: '13%', img: 'd1.png', z: 1, rotation: 515},
    {value:40, size: 15, x:0, y:0, xStart: '82%',  yStart: '31%', img: 'd2.png', z: 1, rotation: -620},
    {value:15, size: 12, x:0, y:0, xStart: '0%',   yStart: '33%', img: 'd3.png', z: 1, rotation: -700},
    {value:5,  size: 5,  x:0, y:0, xStart: '88%',  yStart: '88%', img: 'd1.png', z: 0, rotation: 350},
    {value:6,  size: 6,  x:0, y:0, xStart: '60%',  yStart: '66%', img: 'd2.png', z: 0, rotation: -490},
    {value:4,  size: 4,  x:0, y:0, xStart: '60%',  yStart: '41%', img: 'd3.png', z: 0, rotation: 555},
    {value:5,  size: 5,  x:0, y:0, xStart: '2%',   yStart: '77%', img: 'd4.png', z: 0, rotation: -666},
    {value:8,  size: 8,  x:0, y:0, xStart: '33%',  yStart: '89%', img: 'd1.png', z: 0, rotation: 470},
    {value:10, size: 10, x:0, y:0, xStart: '87%',  yStart: '2%',  img: 'd2.png', z: 0, rotation: -500},
    {value:4,  size: 4,  x:0, y:0, xStart: '2%',   yStart: '10%', img: 'd3.png', z: 0, rotation: 500},
    {value:4,  size: 4,  x:0, y:0, xStart: '22%',  yStart: '52%', img: 'd4.png', z: 0, rotation: -500},
  ];

  private serverResponse;

  constructor(
    private readonly translateService: MyTranslateService,
    private readonly adaptiveService: AdaptiveService,
    private readonly cdr: ChangeDetectorRef,
    @Optional() @Inject(RESPONSE) response: any,
    @Inject('isServer') private isServer: boolean,
  ) {
    this.serverResponse = response;
  }

  setEasterEgg(): void {
    this.paralaxElements = this.paralaxElements.map(el => ({...el, img: 'easter-egg-1.png'}));
    this.easterEggApplied = true;
    this.cdr.markForCheck();
  }

  @HostListener('window:mousemove', ['$event'])
  mousemove(event: MouseEvent): void {
    this.paralaxElements.forEach(el => {
      if(!this.adaptiveService.isTouchDevice()) {
        el.x = (window.innerWidth - (event.pageX - window.innerWidth/2) * el.value) / 90;
        el.y = (window.innerHeight - (event.pageY - window.innerHeight/2) * el.value) / 90;
      } else {
        el.x = 0;
        el.y = 0;
      }
    })
    this.cdr.markForCheck();
  }

  @HostListener("document:keydown", ["$event"])
  keyPress(event: any) {
    // NOTE: Shift + F
    if(!this.easterEggApplied && ['KeyF'].includes(event.code) && event.shiftKey) {
      this.setEasterEgg();
    }
  }

  ngOnInit(): void {
    if(this.isServer) {
      this.serverResponse?.status(404);
    } else if(Math.random()>.95) {
      this.setEasterEgg();
    }
  }
}
