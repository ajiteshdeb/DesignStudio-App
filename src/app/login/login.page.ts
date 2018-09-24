import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginForm } from '../interfaces/login-form.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errMsg = null;


  constructor(
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService
              ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(value: LoginForm, valid: boolean) {
    this.submitted = true;
    if (valid) {
      this.authService.login(value).subscribe((data) => {
        console.log(localStorage.getItem('token'));
      }, (e) => {
        console.log(e);
        this.errMsg = e.message;
      });
    }
  }

}
