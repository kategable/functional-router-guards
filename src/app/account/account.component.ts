import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';
import { User } from './../user-model';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(private readonly loggerService: LoggerService, private readonly router:Router) {}
  user?: User = this.loggerService.user;
  logout() {
    this.loggerService.isLoggedin = false;
    this.loggerService.user = undefined;
    this.router.navigate(['/']);
  }
}
