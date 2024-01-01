import {Inject, Injectable} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ICONS} from "@constants/base/icons.const";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    @Inject('isServer') private isServer: boolean,
  ) {}

  registerIcons(): void {
    ICONS.forEach((icon: {name: string, path: string}) => this.addIcon(icon));
  }

  private addIcon(icon: {name: string, path: string}): void {
    this.matIconRegistry.addSvgIcon(
      icon.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.isServer ? `http://localhost:${environment.serverPort || 4000}/` + icon.path : icon.path
      )
    );
  }
}
