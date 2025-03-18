import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthserviceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if the user is trying to access admin routes
    if (state.url.includes('/admin')) {
      const user = this.getUserFromToken(token);
      if (user?.role !== 'admin') {
        this.router.navigate(['/home']);
        return false;
      }
    }

    return true;
  }

  private getUserFromToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    } catch (e) {
      return null;
    }
  }
}
