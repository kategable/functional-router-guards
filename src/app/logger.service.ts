import { Injectable } from '@angular/core';
import { User } from './user-model';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public isLoggedin = false;
  user?: User ;
  constructor() {}
}
