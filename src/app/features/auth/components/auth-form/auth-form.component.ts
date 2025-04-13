import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
})
export class AuthFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isSignIn: boolean = true;

  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  toggleAuthMode(): void {
    this.isSignIn = !this.isSignIn;
  }

  async onSubmit(): Promise<void> {
    if (this.authForm.invalid) {
      return;
    }

    let email = this.authForm.value.email;
    let password = this.authForm.value.password;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return;
    }

    let result: boolean;
    if (this.isSignIn) {
      result = await this.authService.signIn(
        this.authForm.value.email!,
        this.authForm.value.password!
      );
    } else {
      result = await this.authService.signUp(
        this.authForm.value.email!,
        this.authForm.value.password!
      );
    }

    if (result) {
      this.router.navigate(['/dashboard']);
    }
  }
}
