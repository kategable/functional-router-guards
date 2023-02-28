import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from './user.service';

export const authGuard = () => {
  const router = inject(Router);
  const service = inject(UserService);
  return service.isLoggedIn().pipe(
    tap((value) => {
      return !value ? router.navigate(['/login']) : true;
    })
  );
};
