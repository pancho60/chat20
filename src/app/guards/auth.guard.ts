import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

   constructor(private aFaut: AngularFireAuth,
    private router: Router) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.aFaut.authState.pipe(
      map((auth: any) => {
        if (auth === undefined || auth === null) {
           this.router.navigate(['/login']);
          return false;
          
        } else {
         
          return true;
        }
      })
    );
  }
  
  }
  

