import { inject, Injectable, Signal } from '@angular/core'; // Import signal and Signal
import { toSignal } from '@angular/core/rxjs-interop'; // Import toSignal
import { FirestoreProjectsService } from '../data-sources/firestore-projects.service';
import { CreateProjectData, Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly dataSource = inject(FirestoreProjectsService);

  readonly projectsSignal: Signal<Project[]> = toSignal(
    this.dataSource.projects$,
    {
      initialValue: [],
    }
  );

  constructor() {}

  async addProject(data: CreateProjectData) {
    return await this.dataSource.createProject(data);
  }

  async deleteProject(id: string): Promise<void> {
    await this.dataSource.deleteProject(id);
  }
}
