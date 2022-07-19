import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/utility/services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: any;

  isLoading = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    let token = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));

    if (token == null) return;

    this.userService.findById(token.id).subscribe((res: any) => {
      this.user = res.data.user;
      this.isLoading = false;
      console.log(this.user);
    });
  }

  update() {
    console.log('Update called');
    this.userService.update(this.user).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/home/profile']);
    });
  }
}
