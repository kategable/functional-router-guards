import { inject, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
  RouterModule,
  Routes,
} from '@angular/router';
import { map } from 'rxjs';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [
      (next: ActivatedRouteSnapshot) => {
        const service = inject(UserService);
        return service
          .isLoggedIn()
          .pipe(
            map((isLoggedIn) =>
              isLoggedIn
                ? true
                : createUrlTreeFromSnapshot(next, ['/', 'login'])
            )
          );
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
