import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './features/auth/guards/auth.guard';
import { AuthService } from './features/auth/services/auth.service';
import { AuthViewComponent } from './features/auth/views/auth-view/auth-view.component';
import { DashboardViewComponent } from './features/dashboard/views/dashboard-view/dashboard-view.component';

export const routes: Routes = [
  { path: 'auth', component: AuthViewComponent, canActivate: [noAuthGuard] },
  {
    path: 'dashboard',
    component: DashboardViewComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    canActivate: [
      async () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        return authService.isAuthenticated().then((isAuthenticated) => {
          if (isAuthenticated) {
            router.navigate(['/dashboard']);
          } else {
            router.navigate(['/auth']);
          }
          return false;
        });
      },
    ],
    component: AuthViewComponent,
  },
  { path: '**', redirectTo: '' },
];
