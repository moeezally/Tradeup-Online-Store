import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/utility/services/user/user.service';

@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupObj: any = {};
  confirmpass: String = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  signup() {
    if (this.signupObj.password == this.confirmpass) {
      this.userService.signup(this.signupObj).subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['auth/login']);
      });
    } else alert("Passwords don't match");
  }
}
