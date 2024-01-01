import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {IPhoto} from "@interfaces/photo.interface";

@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.scss', './photo-slider.component.media.scss']
})
export class PhotoSliderComponent {
  @Input() imageList: IPhoto[] = [];
  @Input() width!: number;

  currentImage = 0;

  constructor(private readonly cdr: ChangeDetectorRef) {
  }


  setCurrentSlide(index: number): void {
    this.currentImage = index;
    this.cdr.markForCheck();
  }

  prevSlide(): void {
    if (this.imageList.length > 1) {
      this.setCurrentSlide(this.currentImage > 0 ? this.currentImage - 1 : this.imageList.length - 1)
    }
  }

  nextSlide(): void {
    if (this.imageList.length > 1) {
      this.setCurrentSlide(
        this.currentImage < this.imageList.length - 1
          ? this.currentImage + 1
          : 0)
    }
  }
}
