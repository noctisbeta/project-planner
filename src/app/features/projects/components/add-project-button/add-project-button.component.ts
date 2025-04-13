import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-add-project',
  imports: [],
  templateUrl: './add-project-button.component.html',
  styleUrl: './add-project-button.component.css',
})
export class AddProjectButtonComponent {
  private readonly projectsService = inject(ProjectsService);

  async onAddProject() {
    this.projectsService.addProject({
      name: 'New Project',
      description: 'This is a new project',
    });
  }
}
