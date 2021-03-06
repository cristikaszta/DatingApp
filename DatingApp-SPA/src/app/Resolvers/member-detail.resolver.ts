import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../Services/alertify.service';
import { Observable, of } from 'rxjs';
import { UserService } from '../Services/user.service';
import { catchError } from 'rxjs/operators';
//getting data when loading component instead of getting to the user serice to get it
@Injectable()
export class MemberDetailResolver implements Resolve<User>{
  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) { }

  resolve(router: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(router.params['id']).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/members']);
        return of(null);
      })
    )
  }
}
