import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects-list',
  imports: [],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css',
})
export class ProjectsListComponent {
  private readonly projectsService = inject(ProjectsService);

  readonly projectsSignal = this.projectsService.projectsSignal;

  async ngOnInit() {
    // this.projects = await this.projectsService.getProjects();
    // console.log(this.projects);
    console.log(this.projectsSignal());
  }
}
