import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('authGuard');

  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  }

  if (!state.url.match('/auth')) {
    router.navigate(['/auth']);
  }
  return false;
};

export const noAuthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('noAuthGuard');
  const isAuthenticated = await authService.isAuthenticated();

  if (!isAuthenticated) {
    return true;
  }

  if (!state.url.match('/dashboard')) {
    router.navigate(['/dashboard']);
  }
  return false;
};
