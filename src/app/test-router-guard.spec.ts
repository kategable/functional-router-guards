import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { authGuard } from './app-routing.module';
import { UserService } from './user.service';

fdescribe('authGuard', () => {
  let userService: jasmine.SpyObj<UserService>;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    userService = jasmine.createSpyObj('UserService', ['isLoggedIn']);
    activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    routerStateSnapshot = {} as RouterStateSnapshot;
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: UserService, useValue: userService }],
    });
  });

  it('should return true if user is logged in', (done) => {
    // Arrange
    userService.isLoggedIn.and.returnValue(of(true));
    TestBed.inject(authGuard);
    const guard = authGuard();

    // Act
    guard(activatedRouteSnapshot).subscribe((result) => {
      // Assert
      expect(result).toBe(true);
      done();
    });
  });

  it('should return a URL tree if user is not logged in', (done) => {
    // Arrange
    userService.isLoggedIn.and.returnValue(of(false));
    const guard = authGuard();

    // Act
    guard(activatedRouteSnapshot).subscribe((result) => {
      // Assert
      expect(result.valueOf).toEqual('/login');
      done();
    });
  });
});
