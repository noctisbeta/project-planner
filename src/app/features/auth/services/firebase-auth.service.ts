import {
  inject,
  Injectable,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  user,
  User,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthProvider } from '../interfaces/auth-provider';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthService implements AuthProvider {
  private readonly auth: Auth = inject(Auth);
  private readonly injector: Injector = inject(Injector);

  readonly authState$: Observable<User | null> = authState(this.auth);
  readonly user$: Observable<User | null> = user(this.auth);

  async getCurrentUser(): Promise<User | null> {
    await this.auth.authStateReady();
    return this.auth.currentUser;
  }

  async signInWithGoogle(): Promise<boolean> {
    const provider = new GoogleAuthProvider();
    return runInInjectionContext(this.injector, async () => {
      try {
        await signInWithPopup(this.auth, provider);
        return true;
      } catch (error) {
        console.error('Google Sign-in error:', error);
        return false;
      }
    });
  }

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
    return this.getCurrentUser().then((user) => user !== null);
  }
}
