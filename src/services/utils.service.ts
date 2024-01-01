import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private scrollY = 0;
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  disableGlobalScroll(): void {
    // Сохраняем текущую позицию прокрутки
    this.scrollY = window.scrollY;

    // Блокируем прокрутку страницы
    this.renderer.setStyle(document.body, 'position', 'fixed');
    this.renderer.setStyle(document.body, 'top', `-${this.scrollY}px`);
    this.renderer.setStyle(document.body, 'left', '0');
    this.renderer.setStyle(document.body, 'right', '0');
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  }

  enableGlobalScroll(): void {
    // Убираем стили, чтобы разблокировать прокрутку страницы
    this.renderer.removeStyle(document.body, 'position');
    this.renderer.removeStyle(document.body, 'top');
    this.renderer.removeStyle(document.body, 'left');
    this.renderer.removeStyle(document.body, 'right');
    this.renderer.removeStyle(document.body, 'overflow-y');

    // Прокручиваем страницу на сохраненную позицию
    window.scrollTo(0, this.scrollY);
  }
}
