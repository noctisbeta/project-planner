import { Component, inject } from '@angular/core'; // Import ChangeDetectorRef
import { ProjectsService } from '../../services/projects.service';
// Import NgFor, NgIf, AsyncPipe etc. if NOT standalone and needed
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  standalone: true, // Assuming standalone
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
