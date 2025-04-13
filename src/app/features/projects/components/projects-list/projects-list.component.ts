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

  async onDeleteProject(id: string): Promise<void> {
    try {
      await this.projectsService.deleteProject(id);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }
}
