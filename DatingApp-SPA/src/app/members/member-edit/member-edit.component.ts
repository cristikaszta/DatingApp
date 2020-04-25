import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/Models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
    }

  constructor(private router: ActivatedRoute, private alertify: AlertifyService, private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.router.data.subscribe((data) => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {

      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {

      this.alertify.error(error);
    });
  }
}
