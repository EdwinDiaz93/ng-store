import { Routes } from '@angular/router';



export const profileRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/profile/profile').then(c => c.Profile),
  }


];
