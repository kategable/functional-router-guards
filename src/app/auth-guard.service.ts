import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  createUrlTreeFromSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService
      .isLoggedIn()
      .pipe(
        map((isLoggedIn) =>
          isLoggedIn ? true : createUrlTreeFromSnapshot(next, ['/', 'login'])
        )
      );
  }
}
