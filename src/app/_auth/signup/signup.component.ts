import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/app-service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: any;
  constructor(
    private route: Router,
    private readonly fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onClick() {
    if (this.form.value) {
      console.log('sachin', this.form.value);
      const email = this.form.value.email;
      const password = this.form.value.password;
      this.auth.signup(email, password).subscribe(
        (response) => {
          console.log('response :', response);
        },
        (err) => {
          console.log('error :', err);
        }
      );
    } else {
    }
  }

  signin() {
    this.route.navigate(['signin']);
  }
}
