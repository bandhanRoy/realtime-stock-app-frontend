import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  message = '';
  userRegistrationForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    confirmPassword: new FormControl('', [
      Validators.required]),
  });

  constructor(
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.userRegistrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (
      this.userRegistrationForm.invalid ||
      (this.userRegistrationForm.value.password !== this.userRegistrationForm.value.confirmPassword)) {
      return;
    }

    // else hit the api
    this.commonService.register(this.userRegistrationForm.value).subscribe((res: any) => {
      this.router.navigateByUrl('');
    }, (error) => {
      this.message = error.error.message;
      setTimeout(() => {
        this.message = '';
      }, 2000);
    });
  }

}