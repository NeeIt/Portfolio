import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input} from '@angular/core';
import {sliderAnimation} from "@components/components/presentation-slider/presentation-slider.animations";

@Component({
  selector: 'app-presentation-slider',
  templateUrl: './presentation-slider.component.html',
  styleUrls: ['./presentation-slider.component.scss'],
  animations: [sliderAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationSliderComponent {
  @Input() position: 'top' | 'bottom' | 'center' = 'center';
  @Input() reversed = false;
  @Input() set items(items: string[] | string[][]) {
    if(items.length) {
      if (typeof items[0] === 'string') {
        this._rows = [items as string[]]
      } else {
        const result: string[][] = [];
        for(let i = 0; i < items.length; i++) {
          result[i] = items[i] as string[];
        }
        this._rows = result;
      }
    }
  }

  _rows: string[][] = [];
  itemWidth: number = 50;
  animationState = 'void';

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Inject('isServer') public isServer: boolean,
  ) {}

  ngOnInit() {
    if(!this.isServer) {
      this.animationState = 'start';
    }
  }

  animationDone(event: any, rowIndex: number): void {
    console.log(event, rowIndex);
    if (event.toState === 'start') {
      let item, newRow;

      if(rowIndex % 2  === 1) {
        item = this._rows[rowIndex][0];
        newRow = this._rows[rowIndex].filter((item, index) => index > 0);
        newRow.push(item);
      } else {
        item = this._rows[rowIndex][this._rows[rowIndex].length - 1];
        newRow = this._rows[rowIndex].filter((item, index) => index < this._rows[rowIndex].length - 1);
        newRow.unshift(item);
      }

      this._rows[rowIndex] = newRow;
      this.animationState = 'end';
      this.cdr.markForCheck();
      setTimeout(() => {
        this.animationState = 'start';
        this.cdr.markForCheck();
      }, 0)
    }
  }

  public trackSlide(index: number, element: string): string {
    return element;
  }
}
