import { Component } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-auth-view',
  imports: [AuthFormComponent],
  templateUrl: './auth-view.component.html',
  styleUrl: './auth-view.component.css',
})
export class AuthViewComponent {}
