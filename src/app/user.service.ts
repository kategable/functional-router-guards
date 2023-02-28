import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly loggerService: LoggerService) {}
  isLoggedIn() {
    return of(this.loggerService.isLoggedin).pipe(tap((v) => console.log(v)));
  }
}
