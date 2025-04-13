import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-out-button',
  imports: [],
  templateUrl: './sign-out-button.component.html',
  styleUrl: './sign-out-button.component.css',
})
export class SignOutButtonComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async signOut(): Promise<void> {
    try {
      const result = await this.authService.signOut();
      if (result) {
        this.router.navigate(['/auth']);
      }
    } catch (error) {
      console.error('Sign out failed', error);
    }
  }
}
