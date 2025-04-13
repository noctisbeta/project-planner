import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from './../../firebase/firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly firebaseAuthService = inject(FirebaseAuthService);
  private readonly router = inject(Router);

  async isAuthenticated(): Promise<boolean> {
    return await this.firebaseAuthService.isAuthenticated();
  }

  async signUp(email: string, password: string): Promise<boolean> {
    try {
      await this.firebaseAuthService.signUp(email, password);
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      await this.firebaseAuthService.signIn(email, password);
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  }

  async signOut(): Promise<boolean> {
    try {
      await this.firebaseAuthService.signOut();
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      return false;
    }
  }
}
