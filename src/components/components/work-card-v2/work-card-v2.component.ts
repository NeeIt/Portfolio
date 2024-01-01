import {Component, Input} from '@angular/core';
import {IProject} from "@interfaces/works.interface";

@Component({
  selector: 'app-work-card-v2',
  templateUrl: './work-card-v2.component.html',
  styleUrls: ['./work-card-v2.component.scss', './work-card-v2.component.media.scss']
})
export class WorkCardV2Component {
  @Input() work!: IProject;
}
