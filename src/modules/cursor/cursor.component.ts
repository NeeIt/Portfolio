import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  SimpleChanges,
  ViewChild
} from '@angular/core';

// data that will be used in cursor
interface CursorOptions {
  radius: number;
  background: string;
  borderColor: string;
  borderWidth: number;
}

// Inout data
interface CursorInputOptions {
  radius?: number;
  background?: string;
  borderColor?: string;
  borderWidth?: number;
}

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursorComponent {
  @Input() options!: CursorInputOptions;

  private _defaultOptions = {
    radius: 40,
    background: '#fff',
    borderColor: '#000',
    borderWidth: 1,
  };

  private _currentOptions: CursorOptions = this._defaultOptions;

  styles: {[key: string]: any} = {
    height: '40px',
    width: '40px',
    top: '-40px',
    left: '-40px',
    background: '#fff',
    borderColor: '#000',
    borderWidth: '1px',
  }


  constructor(private readonly cdr: ChangeDetectorRef) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['options']) {
      this._currentOptions = {
        ...this._defaultOptions,
        ...changes['options'].currentValue
      };

      this.styles = {
        width: this._currentOptions.radius + 'px',
        height: this._currentOptions.radius + 'px',
        left: -(this._currentOptions.radius + 'px'),
        top: -(this._currentOptions.radius + 'px'),
        background: this._currentOptions.background,
        borderColor: this._currentOptions.background,
        borderWidth: this._currentOptions.borderWidth+'px',
      }

      this.cdr.markForCheck();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  mousemove(event: MouseEvent): void {
    this.updateCursorPosition(event);
  }

  private updateCursorPosition(e: MouseEvent): void {
    this.styles['transform'] = `translate3d(${e.clientX + this._currentOptions.radius/2}px, ${e.clientY + this._currentOptions.radius/2}px, 0)`
  };

}
