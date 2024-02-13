import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private toastr:ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedInGuard) {
      return true;
    }
    else {
      if (this.authService.num == 1) {
        this.router.navigate(['/login']);
        return false;
      }
      else {
        this.toastr.warning('You dont have permission to access this page!..');
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
  
}
