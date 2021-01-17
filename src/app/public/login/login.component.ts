import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLoginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
  });

  submitted = false;

  message = '';

  constructor(
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.userLoginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userLoginForm.invalid) {
      return;
    }
    // else hit the api
    this.commonService.login(this.userLoginForm.value).subscribe((res: any) => {
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('userName', this.userLoginForm.value.username);
      this.router.navigateByUrl('/dashboard');
    }, (error) => {
      this.message = error.error.message;
      setTimeout(() => {
        this.message = '';
      }, 2000);
    });
  }

}
