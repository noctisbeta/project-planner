import { Component } from '@angular/core';
import { SignOutButtonComponent } from '../../../auth/components/sign-out-button/sign-out-button.component';
import { AddProjectButtonComponent } from '../../../projects/components/add-project/add-project-button.component';
import { ProjectsListComponent } from '../../../projects/components/projects-list/projects-list.component';

@Component({
  selector: 'app-dashboard-view',
  imports: [
    ProjectsListComponent,
    SignOutButtonComponent,
    AddProjectButtonComponent,
  ],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.css',
})
export class DashboardViewComponent {}
