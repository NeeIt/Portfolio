import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TabIndexService} from "@services/tab-index.service";
import {PROJECTS} from "@constants/works/works.const";

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss', './work-list.component.media.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkListComponent {
  readonly projects = Object.values(PROJECTS);
  readonly breadcrumbs: { title: string, url?: string }[] = [
    {title: 'SEO.WORKS.NAVIGATION', url: '/works'},
    {title: 'SEO.WORK_LIST.NAVIGATION'}
  ];

  show = false;

  readonly tabIndexes$ = this.tabIndexService.tabIndexValues$;

  constructor(
    private readonly tabIndexService: TabIndexService
  ){}

  ngOnInit(): void {
    this.show=true;
  }
}
