import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app-service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form: any;
  error : any;
  
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
    console.log('auth :', this.form.value);
    if (this.form.value) {
      const email = this.form.value.email;
      const password = this.form.value.password;
      this.auth.signin(email, password).subscribe(
        (response) => {
          console.log('auth response :', response);
          this.route.navigate(['home']);
        },
        (err) => {
          console.log('error :', err);
          this.error = err.error.error.message;
        }
      );
    } else {
    }
  }
  signup() {
    this.route.navigate(['signup']);
  }
}
