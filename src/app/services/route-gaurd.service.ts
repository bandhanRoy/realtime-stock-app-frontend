import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouteGaurdService {

  constructor(private router: Router) { }
  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }
}