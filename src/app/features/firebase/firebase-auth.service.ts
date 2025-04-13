import {
  inject,
  Injectable,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { AuthProvider } from '../auth/interfaces/auth-provider';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthService implements AuthProvider {
  private readonly auth: Auth = inject(Auth);
  private readonly injector = inject(Injector);

  async signIn(email: string, password: string): Promise<boolean> {
    return runInInjectionContext(
      this.injector,
      async () =>
        await signInWithEmailAndPassword(this.auth, email, password)
          .then(() => true)
          .catch(() => false)
    );
  }

  async signUp(email: string, password: string): Promise<boolean> {
    return runInInjectionContext(
      this.injector,
      async () =>
        await createUserWithEmailAndPassword(this.auth, email, password)
          .then(() => true)
          .catch(() => false)
    );
  }

  async signOut(): Promise<boolean> {
    return runInInjectionContext(
      this.injector,
      async () =>
        await firebaseSignOut(this.auth)
          .then(() => true)
          .catch(() => false)
    );
  }

  async isAuthenticated(): Promise<boolean> {
    await this.auth.authStateReady();
    return this.auth.currentUser !== null;
  }
}
