import {Component, Input} from '@angular/core';
import {IProject} from "@interfaces/works.interface";

@Component({
  selector: 'app-work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss']
})
export class WorkCardComponent {
  @Input() work!: IProject;
}
