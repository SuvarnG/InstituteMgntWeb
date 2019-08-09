import { AuthService } from '../../../auth/services/auth.service'
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.loginService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!this.loginService.isAuthenticated()) {
          this.router.navigate(['/Login']);
          return false;
        }
        return true;
      })
    );
  }
}