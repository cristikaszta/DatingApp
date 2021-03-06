import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../Services/alertify.service';
import { Observable, of } from 'rxjs';
import { UserService } from '../Services/user.service';
import { catchError } from 'rxjs/operators';
//getting data when loading component instead of getting to the user serice to get it
@Injectable()
export class MemberListResolver implements Resolve<User[]>{
  pageNumber = 1;
  pageSize = 5;

  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) { }

  resolve(router: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    )
  }
}
