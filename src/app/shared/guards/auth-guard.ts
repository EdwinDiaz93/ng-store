import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../features/auth/service/auth';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isAuthenticated()) {

    return true;
  }
  else{
    router.navigate(['/auth/login']);
    return false;
  }

};
