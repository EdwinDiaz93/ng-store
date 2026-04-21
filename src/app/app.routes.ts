import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';
import { Sidebar } from './shared/components/sidebar/sidebar';

export const routes: Routes = [

  {
    path: 'dashboard',
    component: Sidebar,
    canActivate: [authGuard],
    children: [
      {
        path: 'productos',
        loadChildren: () => import('./features/products/routes').then(m => m.productRoutes),
      },
      {
        path: 'perfil',
        loadChildren: () => import('./features/profile/routes').then(m => m.profileRoutes),
      },
      {
        path: '**',
        redirectTo: 'productos'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/routes').then(m => m.authRoutes),
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }

];
